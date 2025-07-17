import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import imagemin from 'imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminWebp from 'imagemin-webp'

const Main = async () => {
  dotenv.config()

  const originalsDir = process.env.ORIGINALS_DIR || './images/originals'
  const compressedDir = process.env.COMPRESSED_DIR || './images/compressed'
  const cloudFolder = process.env.CLOUD_FOLDER || 'portfolio-projects'
  const jsonPath = '../src/data/projects.json'

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  // 0. Preparar pastas
  if (!existsSync(originalsDir)) {
    mkdirSync(originalsDir)
  }
  if (!existsSync(compressedDir)) {
    mkdirSync(compressedDir)
  }

  // 1. Comprimir com Squoosh CLI
  await compressImagesWithImagemin(originalsDir, compressedDir)

  // 2. Upload para Cloudinary
  const urls = await uploadCloudinary(compressedDir, cloudFolder)

  // 3. Atualizar o JSON com as URLs
  updateProjectImageURLs(jsonPath, urls)
}

await Main()

// Slugify: transforma título em nome de arquivo válido
function slugify(title) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

async function compressImagesWithImagemin(
  originalsDirPath,
  compassedImageDirPath
) {
  // biome-ignore lint/suspicious/noConsole : use console
  console.log('\n🗜️  Comprimindo imagens com imagemin...')

  const files = readdirSync(originalsDirPath)

  const compressions = files.map(async (file) => {
    const inputPath = path.join(originalsDirPath, file)
    const slug = path.parse(file).name

    const compressed = await imagemin([inputPath], {
      destination: compassedImageDirPath,
      plugins: [
        imageminWebp({ quality: 75 }),
        imageminMozjpeg({ quality: 75 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
      ],
    })

    if (compressed.length > 0) {
      // biome-ignore lint/suspicious/noConsole : use console
      console.log(`✅ ${file} comprimida → ${slug}.webp`)
    } else {
      // biome-ignore lint/suspicious/noConsole : use console
      console.warn(`⚠️ Falha ao comprimir: ${file}`)
    }
  })

  await Promise.all(compressions)

  // biome-ignore lint/suspicious/noConsole : use console
  console.log('✅ Compressão finalizada.\n')
}

async function uploadCloudinary(compassedImageDirPath, uploadFolder) {
  // biome-ignore lint/suspicious/noConsole : use console
  console.log('☁️  Enviando para o Cloudinary...\n')

  const files = readdirSync(compassedImageDirPath)
  const uploadedUrls = {}

  const uploadPromises = files.map(async (file) => {
    const filePath = path.join(compassedImageDirPath, file)
    const baseName = path.parse(file).name // slug

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: uploadFolder,
        public_id: baseName,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      })

      // biome-ignore lint/suspicious/noConsole : use console
      console.log(`✅ Upload: ${file}`)

      // biome-ignore lint/suspicious/noConsole : use console
      console.log(`🔗 URL: ${result.secure_url}\n`)

      uploadedUrls[baseName] = result.secure_url
    } catch (err) {
      // biome-ignore lint/suspicious/noConsole : use console
      console.error(`❌ Erro ao subir ${file}:`, err)
    }
  })

  await Promise.all(uploadPromises)
  return uploadedUrls
}

function updateProjectImageURLs(projectsDataPath, urls) {
  // biome-ignore lint/suspicious/noConsole : use console
  console.log('📝 Atualizando projects.json...\n')

  const projectsPath = path.resolve(projectsDataPath)
  const projectsData = JSON.parse(readFileSync(projectsPath, 'utf-8'))

  const updatedProjects = projectsData.map((project) => {
    const slug = slugify(project.imageName)
    return {
      ...project,
      image: urls[slug] || project.image,
    }
  })

  writeFileSync(projectsPath, JSON.stringify(updatedProjects, null, 2))

  // biome-ignore lint/suspicious/noConsole : use console
  console.log('✅ JSON atualizado com sucesso.\n')

  // biome-ignore lint/suspicious/noConsole : use console
  console.log('🎉 Processo completo!')
}
