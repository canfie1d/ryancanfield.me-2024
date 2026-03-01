// Types only — data is now managed in Sanity

export type Project = {
  title: string
  link: string
  url: string
  tags: string[]
  description: string
  image: { asset: { url: string } }
}

export type ArticleLink = {
  title: string
  description: string
  image: { asset: { url: string } }
  url: string
  length: string
}

export type OpenSource = {
  title: string
  githubUrl: string
  npmUrl?: string
  description?: string
}

export type Demo = {
  title: string
  id: string
  image: { asset: { url: string } }
  hearts: string
}

export type Recommendation = {
  name: string
  company: string
  position: string
  message: string[]
}

export type ContactPoint = {
  url: string
  title: string
  type?: string
  icon?: string
}

export type Client = {
  title: string
  url?: string
}
