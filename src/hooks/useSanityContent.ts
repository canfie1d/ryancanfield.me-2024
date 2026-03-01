import { useQuery } from '@tanstack/react-query'
import { sanityClient } from '~/sanity/client'
import { queries } from '~/sanity/queries'

const STALE_TIME = 1000 * 60 * 5 // 5 min cache

const useSanityQuery = <T>(key: string, query: string) =>
  useQuery<T>({
    queryKey: [key],
    queryFn: () => sanityClient.fetch<T>(query),
    staleTime: STALE_TIME,
  })

export type UiStringsResult = Record<string, string | string[] | number | undefined> & {
  formLabelName?: string
  formCodeButtonClear?: string
  themeModalTitle?: string
  themeLockedTooltip?: string
  themeLockMessage?: string
  githubModalTitle?: string
  githubModalSubtitle?: string
  githubButtonLabel?: string
  githubPollKeep?: string
  githubPollRemove?: string
  cardTitleThemes?: string
  cardTitleAchievements?: string
  cardTitleLore?: string
  loreCountTotal?: number
  loadingText?: string
  loadingMessages?: string[]
  ariaCloseModal?: string
  ariaClose?: string
  ariaLockedTheme?: string
  ariaLockColor?: string
  ariaHome?: string
  ariaCodeDigitTemplate?: string
  caseStudyProblem?: string
  caseStudySolution?: string
  caseStudyResult?: string
  workSectionOpenSource?: string
  aboutSectionMeta?: string
  loginButtonGithub?: string
  colorCopy?: string
  colorLock?: string
  colorChooseNew?: string
  colorCopiedToast?: string
}

export type InventoryItemResult = {
  id?: string
  name?: string
  description?: string
  icon?: string
  useContent?: string
  addOnFor?: string
}

export type ProjectResult = {
  title?: string
  link?: string
  url?: string
  tags?: string[]
  description?: string
  image?: { asset?: { url?: string } }
}

export type ArticleLinkResult = {
  title?: string
  description?: string
  url?: string
  length?: string
  imageUrl?: string
  image?: { asset?: { url?: string } }
}

export type OpenSourceResult = {
  title?: string
  githubUrl?: string
  npmUrl?: string
  description?: string
}

export type CaseStudyImage = { src?: string; caption?: string }

export type CaseStudyResult = {
  id?: string
  title?: string
  subtitle?: string
  link?: string
  problem?: { content?: string[]; images?: CaseStudyImage[] }
  solution?: { content?: string[]; images?: CaseStudyImage[] }
  result?: { content?: string[]; images?: CaseStudyImage[] }
  additionalImages?: CaseStudyImage[]
  videoUrl?: string
  videoPoster?: string
}

export type JourneyContentResult = Record<string, string | unknown[] | undefined> & {
  meta?: string
  title?: string
  introWithCode?: string
  introNoCode?: string
  enterCodePrompt?: string
  journeyEndsIntro?: string
  noCodeHint?: string
  rewardMessage?: string
  eryndorAvailableMessage?: string
  thanksParticipating?: string
  activateButton?: string
  switchButton?: string
  story?: unknown[]
  thanksWalking?: string
}

export const useCaseStudies = () => useSanityQuery<CaseStudyResult[]>('caseStudies', queries.caseStudies)
export const useProjects = () => useSanityQuery<ProjectResult[]>('projects', queries.projects)
export const useArticleLinks = () => useSanityQuery<ArticleLinkResult[]>('articleLinks', queries.articleLinks)
export const useOpenSource = () => useSanityQuery<OpenSourceResult[]>('openSource', queries.openSource)
export const useDemos = () => useSanityQuery('demos', queries.demos)
export const useRecommendations = () => useSanityQuery('recommendations', queries.recommendations)
export const useContactPoints = () => useSanityQuery('contactPoints', queries.contactPoints)
export const useClients = () => useSanityQuery('clients', queries.clients)
export const useAbout = () => useSanityQuery('about', queries.about)
export const useAchievements = () => useSanityQuery('achievements', queries.achievements)
export const useSiteSettings = () => useSanityQuery('siteSettings', queries.siteSettings)
export const useInventoryItems = () => useSanityQuery<InventoryItemResult[]>('inventoryItems', queries.inventoryItems)
export const useThemes = () => useSanityQuery('themes', queries.themes)
export const useUiStrings = () => useSanityQuery<UiStringsResult | null>('uiStrings', queries.uiStrings)
export const useJourneyContent = () => useSanityQuery<JourneyContentResult | null>('journeyContent', queries.journeyContent)

export const usePageContent = (pageSlug: string) =>
  useQuery({
    queryKey: ['pageContent', pageSlug],
    queryFn: () => sanityClient.fetch(queries.pageContent(pageSlug)),
    staleTime: STALE_TIME,
  })
