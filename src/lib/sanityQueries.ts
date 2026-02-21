import groq from 'groq'
import { sanityClient } from './sanity'

export const projectsQuery = groq`*[_type == "project"] | order(url asc){
  _id,
  title,
  link,
  url,
  tags,
  description,
  image
}`

export const articlesQuery = groq`*[_type == "article"] | order(title asc){
  _id,
  title,
  description,
  imageUrl,
  url,
  length
}`

export const openSourceQuery = groq`*[_type == "openSourceProject"] | order(title asc){
  _id,
  title,
  githubUrl,
  npmUrl,
  description
}`

export const caseStudyQuery = groq`*[_type == "caseStudy" && id == $id][0]{
  _id,
  id,
  title,
  subtitle,
  link,
  problem,
  solution,
  result,
  additionalImages,
  videoUrl,
  videoPoster
}`

export const caseStudiesListQuery = groq`*[_type == "caseStudy"]{
  _id,
  id,
  title,
  subtitle,
  path: "/work/" + id
}`

export const pageContentQuery = groq`*[_type == "pageContent" && pageSlug == $pageSlug][0]{
  _id,
  pageSlug,
  introText,
  sections
}`

export const demosQuery = groq`*[_type == "demo"] | order(order asc){
  _id,
  title,
  codepenId,
  image,
  hearts,
  order
}`

export const recommendationsQuery = groq`*[_type == "recommendation"] | order(order asc){
  _id,
  name,
  company,
  position,
  message,
  order
}`

export const contactPointsQuery = groq`*[_type == "contactPoint"] | order(order asc){
  _id,
  url,
  title,
  type,
  icon,
  order
}`

export const siteClientsQuery = groq`*[_type == "siteClient"] | order(order asc){
  _id,
  title,
  url,
  order
}`

export const aboutQuery = groq`*[_type == "about"][0]{
  _id,
  meBio,
  siteBio,
  "resumeUrl": resumeUrl.asset->url
}`

export async function getProjects() {
  return sanityClient.fetch(projectsQuery)
}

export async function getArticles() {
  return sanityClient.fetch(articlesQuery)
}

export async function getOpenSourceProjects() {
  return sanityClient.fetch(openSourceQuery)
}

export async function getCaseStudy(id: string) {
  return sanityClient.fetch(caseStudyQuery, { id })
}

export async function getCaseStudies() {
  return sanityClient.fetch(caseStudiesListQuery)
}

export async function getPageContent(pageSlug: string) {
  return sanityClient.fetch(pageContentQuery, { pageSlug })
}

export async function getDemos() {
  return sanityClient.fetch(demosQuery)
}

export async function getRecommendations() {
  return sanityClient.fetch(recommendationsQuery)
}

export async function getContactPoints() {
  return sanityClient.fetch(contactPointsQuery)
}

export async function getSiteClients() {
  return sanityClient.fetch(siteClientsQuery)
}

export async function getAbout() {
  return sanityClient.fetch(aboutQuery)
}
