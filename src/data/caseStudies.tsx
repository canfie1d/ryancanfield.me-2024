// Types only — data is now managed in Sanity
export type CaseStudyImage = {
  image: { asset: { url: string } }
  caption?: string
}

export type CaseStudySection = {
  content: string[]
  images?: CaseStudyImage[]
}

export type CaseStudy = {
  id: string
  title: string
  path: string
  subtitle: string
  link: string
  problem: CaseStudySection
  solution: CaseStudySection
  result: CaseStudySection
  additionalImages: CaseStudyImage[]
  videoUrl: string
  videoPoster: { asset: { url: string } }
}
