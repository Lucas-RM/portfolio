import { Briefcase, Calendar, Download, FileText, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { EducationProps, ExperiencesProps } from '@/types/resumeProps'

export function Resume() {
  const [experiences, setExperiences] = useState<ExperiencesProps[]>([])
  const [education, setEducation] = useState<EducationProps[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const data = async () => {
      try {
        const [experiencesResponse, educationResResponse] = await Promise.all([
          fetch('./src/data/experiences.json'),
          fetch('./src/data/education.json'),
        ])

        if (!(experiencesResponse.ok && educationResResponse.ok)) {
          throw new Error('Erro ao carregar os dados.')
        }

        const [experiencesData, educationData] = await Promise.all([
          experiencesResponse.json(),
          educationResResponse.json(),
        ])

        // Adiciona uuid para cada item
        const experiencesWithId = experiencesData.map(
          (item: Omit<ExperiencesProps, 'id'>) => ({
            ...item,
            id: uuidv4(),
          })
        )

        const educationWithId = educationData.map(
          (item: Omit<EducationProps, 'id'>) => ({
            ...item,
            id: uuidv4(),
          })
        )

        setExperiences(experiencesWithId || [])
        setEducation(educationWithId || [])
      } catch {
        setError('Não foi possível carregar os dados no momento.')
      }
    }

    data()
  }, [])

  return (
    <section className="bg-muted/30 py-20" id="resume">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">Currículo</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Minha experiência profissional e formação acadêmica
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Experience */}
          <div className="space-y-8">
            <div className="mb-8 flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-2xl">
                Experiência Profissional
              </h3>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="space-y-6">
              {experiences.map((exp) => (
                <Card
                  className="transition-shadow hover:shadow-md"
                  key={exp.id}
                >
                  <CardHeader>
                    <div className="flex flex-col items-start justify-between gap-y-3 md:flex-row md:gap-y-0">
                      <div>
                        <CardTitle className="text-lg">{exp.title}</CardTitle>
                        <CardDescription className="font-medium text-primary">
                          {exp.company}
                        </CardDescription>
                      </div>
                      <div className="text-right text-muted-foreground text-sm">
                        <div className="mb-1 flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-muted-foreground">
                      {exp.description.map((description, index) => (
                        <p className="mt-3" key={Number(index)}>
                          {description}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-8">
            <div className="mb-8 flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              <h3 className="font-semibold text-2xl">Formação Acadêmica</h3>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className="space-y-6">
              {education.map((edu) => (
                <Card
                  className="transition-shadow hover:shadow-md"
                  key={edu.id}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {edu.institution}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-muted-foreground text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {edu.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {edu.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-16 text-center">
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <FileText className="h-6 w-6" />
                Currículo Completo
              </CardTitle>
              <CardDescription>
                Baixe meu currículo em PDF com todas as informações detalhadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" size="lg">
                <a
                  download
                  href="/curriculo/CV - Lucas Rodrigues Marcondes.pdf"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Baixar Currículo (PDF)
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
