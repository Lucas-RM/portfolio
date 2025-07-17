import type { SkillDataProps } from '@/types/skillDataProps'

export const skillCategories = (skillsData: SkillDataProps | null) => {
  return skillsData
    ? [
        {
          title: 'Frontend',
          skills: skillsData.frontend,
          color: 'bg-blue-500',
        },
        {
          title: 'Backend',
          skills: skillsData.backend,
          color: 'bg-green-500',
        },
        {
          title: 'Banco de Dados',
          skills: skillsData.database,
          color: 'bg-orange-500',
        },
        {
          title: 'Ferramentas',
          skills: skillsData.tools,
          color: 'bg-purple-500',
        },
      ]
    : []
}
