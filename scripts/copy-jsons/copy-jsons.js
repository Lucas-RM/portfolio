import { cpSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const srcDir = join('src', 'data');
const destDir = join('public', 'data');

if (!existsSync(destDir)) {
  mkdirSync(destDir, { recursive: true });
}

cpSync(srcDir, destDir, { recursive: true });
console.log('✔ Dados copiados para public/data');
