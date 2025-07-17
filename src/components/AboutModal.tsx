import { Link, User } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ModalAboutProps {
  onClose: () => void
}

export function AboutModal({ onClose }: ModalAboutProps) {
  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open>
      <DialogContent className="my-2 max-h-[calc(100vh-4rem)] max-w-[90vw] overflow-y-auto p-6 sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Sobre Lucas Marcondes
          </DialogTitle>
          <DialogDescription>
            Conheça um pouco mais sobre minha jornada e experiência
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pb-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Minha Jornada</h3>
            <p className="text-justify text-muted-foreground leading-relaxed">
              Olá! Meu nome é Lucas e minha paixão por Tecnologia da Informação
              começou ainda na infância. Entre 2015 e 2020, estudei no CEAP,
              onde participei de diversos cursos na área de TI, concluindo um
              curso técnico em Informática nos dois últimos anos. Foi nesse
              período que tive meu primeiro contato com programação, o que
              consolidou minha decisão de construir uma carreira sólida na área.
            </p>
            <p className="text-justify text-muted-foreground leading-relaxed">
              Em 2022, iniciei minha graduação em Ciência da Computação na
              Universidade Paulista (UNIP). Já no final do primeiro semestre,
              tive a oportunidade de ingressar na Sinqia como Auxiliar de
              Desenvolvimento de Software, atuando em projetos da área de
              Previdência Privada. Lá desenvolvi habilidades técnicas e
              interpessoais, trabalhando com tecnologias como C#, .NET Core,
              ASP.NET MVC, Entity Framework Core, JavaScript, Angular, SQL
              Server, HTML/CSS, SCRUM e Kanban.
            </p>
            <p className="text-justify text-muted-foreground leading-relaxed">
              Sou apaixonado por desenvolvimento de software e, embora atue como
              Desenvolvedor Full Stack, meu foco de especialização está em
              Back-End, onde pretendo aprofundar meus conhecimentos e impactar
              diretamente a arquitetura e a performance de sistemas escaláveis.
            </p>
            <p className="text-justify text-muted-foreground leading-relaxed">
              Além da minha experiência profissional, desenvolvi e estou
              desenvolvendo projetos próprios que reforçam minha autonomia e
              capacidade técnica, como:
            </p>
          </div>

          <div className="space-y-4">
            <ul className="list-inside list-disc space-y-5 text-muted-foreground">
              <li className="ml-3">
                <strong>FileCrypto (Python):</strong> programa de criptografia
                de arquivos com múltiplos métodos, incluindo RSA e ASCII.
                <span className="mt-1 block text-justify">
                  <Link className="mr-2 ml-2 inline h-4 w-4" />
                  <strong className="text-cyan-600/90">
                    Acesse o projeto em:
                  </strong>
                  <a
                    className="ml-1 text-cyan-600/70 underline transition-colors hover:text-cyan-600"
                    href="https://github.com/Lucas-RM/FileCrypto"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    https://github.com/Lucas-RM/FileCrypto
                  </a>
                </span>
              </li>
              <li className="ml-3">
                <strong>
                  API de Registro de Veículos (C#, Minimal API, JWT):
                </strong>{' '}
                API com autenticação, arquitetura limpa (Onion) e testes
                automatizados com MSTest.
                <span className="mt-1 block text-justify">
                  <Link className="mr-2 ml-2 inline h-4 w-4" />
                  <strong className="text-cyan-600/90">
                    Acesse o projeto em:
                  </strong>
                  <a
                    className="ml-1 text-cyan-600/70 underline transition-colors hover:text-cyan-600"
                    href="https://github.com/Lucas-RM/minimal-api"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    https://github.com/Lucas-RM/minimal-api
                  </a>
                </span>
              </li>
              <li className="ml-3">
                <strong>API Notícias DDD (C#, Angular, SQL Server):</strong>{' '}
                desenvolvendo uma API simulando a inserção de notícias via
                cliente, utilizando arquitetura em DDD.
                <span className="mt-1 block text-justify">
                  <Link className="mr-2 ml-2 inline h-4 w-4" />
                  <strong className="text-cyan-600/90">
                    Acesse o projeto em:
                  </strong>
                  <a
                    className="ml-1 text-cyan-600/70 underline transition-colors hover:text-cyan-600"
                    href="https://github.com/Lucas-RM/api-noticias-ddd"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    https://github.com/Lucas-RM/api-noticias-ddd
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-justify text-muted-foreground leading-relaxed">
              Também participei de bootcamps e formações intensivas, como:
            </p>
            <p className="text-justify text-muted-foreground leading-relaxed">
              🚀 Bootcamp XP Inc. Full Stack Developer (DIO): onde desenvolvi
              projetos completos utilizando .NET e React, incluindo blog
              pessoal, tela de cadastro e wiki de Git, além de aprender práticas
              de deploy com especialistas da XP Inc.
            </p>
            <p className="text-justify text-muted-foreground leading-relaxed">
              🌐 Curso Web Moderno com JavaScript (Udemy): 14 cursos em 1 com
              foco em tecnologias como Node.js, React, Angular, Vue.js, Express,
              MySQL, MongoDB, entre outras.
            </p>
            <p className="text-justify text-muted-foreground leading-relaxed">
              🎯 Atualmente, estou em busca de oportunidades como estagiário,
              desenvolvedor júnior ou trainee, onde possa contribuir com meus
              conhecimentos e continuar aprendendo ao lado de pessoas incríveis
              e projetos transformadores.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
