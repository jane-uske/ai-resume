import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/home/sections'
import { ProjectView } from '@/components/project/ProjectView'
import { PROJECTS, getProject } from '@/content/projects'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}
  return {
    title: `${project.name} — 吴健的工程复盘`,
    description: project.oneLiner,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const project = getProject((await params).slug)
  if (!project) notFound()

  return (
    <>
      <SiteHeader />
      <ProjectView project={project} />
    </>
  )
}
