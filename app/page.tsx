import { Hero } from '@/components/home/Hero'
import {
  SiteHeader,
  ProjectsSection,
  ExperienceSection,
  ToolkitSection,
  SkillsSection,
  ContactSection,
} from '@/components/home/sections'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <ToolkitSection />
        <SkillsSection />
      </main>
      <ContactSection />
    </>
  )
}
