import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '~/sanity/client'
import { queries } from '~/sanity/queries'

const fetch = <T>(key: string, query: string) =>
  useQuery<T>({
    queryKey: [key],
    queryFn: () => sanityClient.fetch<T>(query),
    staleTime: 1000 * 60 * 5, // 5 min cache
  })

export const useCaseStudies = () => fetch('caseStudies', queries.caseStudies)
export const useProjects = () => fetch('projects', queries.projects)
export const useArticleLinks = () => fetch('articleLinks', queries.articleLinks)
export const useOpenSource = () => fetch('openSource', queries.openSource)
export const useDemos = () => fetch('demos', queries.demos)
export const useRecommendations = () => fetch('recommendations', queries.recommendations)
export const useContactPoints = () => fetch('contactPoints', queries.contactPoints)
export const useClients = () => fetch('clients', queries.clients)
export const useAbout = () => fetch('about', queries.about)
