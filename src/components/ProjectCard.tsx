import { ExternalLink, Github } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { ProjectImage } from '@/components/ProjectImage'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ProjectDataProps } from '@/types/projectDataProps'

interface ProjectCardProps {
  project: ProjectDataProps
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const descRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleExpand = () => {
      const el = descRef.current
      if (el) {
        const isOverflowing = el.scrollHeight > el.clientHeight + 1
        setIsTruncated(isOverflowing)
      }
    }

    handleExpand()
    window.addEventListener('resize', handleExpand)
    return () => window.removeEventListener('resize', handleExpand)
  }, [])

  return (
    <Card className="group mx-auto h-fit w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <ProjectImage
          alt={project.title}
          className="h-64 w-full object-cover"
          src={project.image}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{project.title}</CardTitle>

        <CardDescription
          className={cn(
            'text-justify text-muted-foreground transition-all duration-300',
            !isExpanded && 'line-clamp-3'
          )}
          ref={descRef}
        >
          {project.description}
        </CardDescription>

        {isTruncated && (
          <div className="text-right">
            <button
              className="inline text-blue-500 text-sm hover:underline"
              onClick={() => setIsExpanded(!isExpanded)}
              type="button"
            >
              {isExpanded ? 'Ver menos' : 'Ver mais'}
            </button>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              className="rounded bg-blue-950 px-2 py-1 font-medium text-primary text-xs"
              key={project.technologies.indexOf(tech)}
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        {project.link_site && (
          <Button asChild className="flex-1">
            <a
              href={project.link_site}
              rel="noopener noreferrer"
              target="_blank"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Projeto
            </a>
          </Button>
        )}
        <Button
          asChild
          className={`${!project.link_site && 'flex-1'}`}
          size="icon"
          variant="outline"
        >
          <a href={project.link} rel="noopener noreferrer" target="_blank">
            {project.link_site ? (
              <Github className="h-4 w-4" />
            ) : (
              <>
                <ExternalLink className="mr-2 h-4 w-4" />
                Abrir Projeto no GitHub
              </>
            )}
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
