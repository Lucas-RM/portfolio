import { Github } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import type { ErrorMessageProps } from '@/types/errorMessageProps'
import type { ProjectDataProps } from '@/types/projectDataProps'
import { ProjectCard } from './ProjectCard'
import { ErrorMessage } from './ui/errorMessage'
import { Pagination } from './ui/pagination'

export function Projects() {
  const [projectsData, setProjectsData] = useState<ProjectDataProps[]>([])
  const [error, setError] = useState<ErrorMessageProps | null>(null)
  const { isMobile, isTablet, isDesktop, breakpoint } = useBreakpoint()

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsResponse = await fetch('./src/data/projects.json')

        if (!projectsResponse) {
          throw new Error('Erro ao buscar arquivos JSON.')
        }

        const projects = await projectsResponse.json()

        setProjectsData(projects)
      } catch {
        setError({
          message: 'Erro ao carregar os projetos.',
          className: 'mx-auto mt-8 max-w-2xs',
        })
      }
    }

    loadProjects()
  }, [])

  const projectsPerPage = useMemo(() => {
    if (isMobile) {
      return 1
    }
    if (isTablet) {
      return 2
    }
    return 6 // desktop
  }, [isMobile, isTablet])

  const projectsPerRows = useMemo(() => {
    if (isMobile) {
      return 1
    }
    if (isTablet) {
      return 2
    }
    return 3 // desktop
  }, [isMobile, isTablet])

  const {
    currentPage: currentPageProjects,
    totalPages: totalPagesProjects,
    paginatedItems: paginatedProjects,
    goToNextPage: goToNextPageProjects,
    goToPreviousPage: goToPreviousPageProjects,
    resetPage: resetPageProjects,
  } = usePagination<ProjectDataProps>(projectsData, projectsPerPage)

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies : É necessário,
   * pois quero resetar 'currentPage' para 0 sempre que 'isMobile', 'isTablet'
   * e 'isDesktop' mudarem de estado.
   */
  useEffect(() => {
    resetPageProjects()
  }, [breakpoint])

  const numberOfProjectColumns =
    paginatedProjects.length < projectsPerRows
      ? paginatedProjects.length
      : projectsPerRows

  const projectGridColsClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
    }[numberOfProjectColumns] || 'grid-cols-1'

  return (
    <section className="py-20" id="projects">
      <div className="container mx-auto px-4">
        <div className={`mb-${!error && 16} text-center`}>
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">Meus Projetos</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Alguns dos projetos que desenvolvi, demonstrando minhas habilidades
            técnicas e criatividade na resolução de problemas.
          </p>
          {error && (
            <ErrorMessage className={error.className} message={error.message} />
          )}
        </div>

        <div
          className={cn(
            'mx-auto grid w-fit auto-rows-auto gap-8',
            projectGridColsClass
          )}
        >
          {paginatedProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {(isMobile || isTablet || isDesktop) && totalPagesProjects > 1 && (
          <Pagination
            currentPage={currentPageProjects}
            onNext={goToNextPageProjects}
            onPrevious={goToPreviousPageProjects}
            totalPages={totalPagesProjects}
          />
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-muted-foreground">
            Interessado em ver mais projetos ou trabalhar juntos?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <a
                href="https://github.com/Lucas-RM?tab=repositories"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github className="mr-2 h-5 w-5" />
                Ver Mais no GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="mailto:lucas.marcondes36@gmail.com">Vamos Conversar</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
