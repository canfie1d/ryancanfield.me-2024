import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { schemas } from './src/sanity/schemas'

export default defineConfig({
  name: 'ryancanfield-studio',
  title: 'ryancanfield.me',
  projectId: '8tzt6p0y',
  dataset: 'production',
  plugins: [visionTool()],
  schema: { types: schemas },
})
