import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '8tzt6p0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
