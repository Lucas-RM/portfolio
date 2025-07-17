import { useEffect, useMemo, useState } from 'react'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { usePagination } from '@/hooks/usePagination'
import { skillCategories } from '@/lib/skillCategories'
import { cn } from '@/lib/utils'
import type { ErrorMessageProps } from '@/types/errorMessageProps'
import type { SkillDataProps } from '@/types/skillDataProps'
import { ErrorMessage } from './ui/errorMessage'
import { Pagination } from './ui/pagination'

export function Skills() {
  const [skillsData, setSkillsData] = useState<SkillDataProps | null>(null)
  const [additionalSkills, setAdditionalSkills] = useState<string[]>([])
  const skillCategoriesData = skillCategories(skillsData)
  const [error, setError] = useState<ErrorMessageProps | null>(null)
  const { isMobile, isTablet, isDesktop, breakpoint } = useBreakpoint()

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const [skillsRes, additionalSkillsRes] = await Promise.all([
          fetch('/data/skills.json'),
          fetch('/data/additionalSkills.json'),
        ])

        if (!(skillsRes.ok && additionalSkillsRes.ok)) {
          throw new Error('Erro ao buscar arquivos JSON.')
        }

        const skills = await skillsRes.json()
        const additional = await additionalSkillsRes.json()

        setSkillsData(skills)
        setAdditionalSkills(additional)
      } catch {
        setError({
          message: 'Erro ao carregar as habilidades.',
          className: 'mx-auto mt-8 max-w-2xs',
        })
      }
    }

    loadSkills()
  }, [])

  const skillsPerPage = useMemo(() => {
    if (isMobile) {
      return 1
    }
    if (isTablet) {
      return 2
    }
    return 4 // desktop
  }, [isMobile, isTablet])

  const {
    currentPage: currentPageSkills,
    totalPages: totalPagesSkills,
    paginatedItems: paginatedCategories,
    goToNextPage: goToNextPageSkills,
    goToPreviousPage: goToPreviousPageSkills,
    resetPage: resetPageSkills,
  } = usePagination(skillCategoriesData, skillsPerPage)

  /**
   * biome-ignore lint/correctness/useExhaustiveDependencies : É necessário,
   * pois quero resetar 'currentPage' para 0 sempre que 'isMobile', 'isTablet'
   * e 'isDesktop' mudarem de estado.
   */
  useEffect(() => {
    resetPageSkills()
  }, [breakpoint])

  const numberOfSkillColumns =
    paginatedCategories.length < skillsPerPage
      ? paginatedCategories.length
      : skillsPerPage

  const skillGridColsClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      4: 'grid-cols-4',
    }[numberOfSkillColumns] || 'grid-cols-1'

  return (
    <section className="bg-muted/30 py-20" id="skills">
      <div className="container mx-auto px-4">
        <div className={`mb-${error ? 0 : 16} text-center`}>
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">
            Minhas Habilidades
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Tecnologias, ferramentas e plataformas que utilizo para criar
            soluções inovadoras e eficientes.
          </p>
          {error && (
            <ErrorMessage className={error.className} message={error.message} />
          )}
        </div>

        <div
          className={cn(
            'mx-auto grid gap-8',
            skillGridColsClass
          )}
        >
          {paginatedCategories.map((category) => (
            <div className="mx-auto w-full max-w-md" key={category.title}>
              <div className="text-center">
                <div
                  className={`h-16 w-16 ${category.color} mx-auto mb-4 flex items-center justify-center rounded-full`}
                >
                  <span className="font-bold text-lg text-white">
                    {category.title.charAt(0)}
                  </span>
                </div>
                <h3 className="mb-4 font-semibold text-xl">{category.title}</h3>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div
                    className="rounded-lg border bg-background p-4 transition-shadow hover:shadow-md"
                    key={skill}
                  >
                    <div className="flex items-center justify-between gap-x-1.5">
                      <span className="font-medium">{skill}</span>
                      <div
                        className={`h-3 w-3 ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {(isMobile || isTablet || isDesktop) && totalPagesSkills > 1 && (
          <Pagination
            currentPage={currentPageSkills}
            onNext={goToNextPageSkills}
            onPrevious={goToPreviousPageSkills}
            totalPages={totalPagesSkills}
          />
        )}

        {/* Additional Skills Section */}

        {additionalSkills.length > 0 && (
          <div className="mt-16 text-center">
            <h3 className="mb-8 font-semibold text-2xl">Outras Competências</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {additionalSkills.map((skill) => (
                <span
                  className="rounded-full bg-primary/10 px-4 py-2 font-medium text-primary text-sm transition-colors hover:bg-primary/20"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
