import type { Project } from '../project-types'
import utanote from './utanote'
import remi from './remi'
import pageagent from './pageagent'

export const PROJECTS: Project[] = [utanote, remi, pageagent]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
