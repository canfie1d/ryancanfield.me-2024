import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
      description: 'Default page title, e.g. Ryan Canfield — Seattle-based software engineering leader',
    }),
    defineField({
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
    }),
    defineField({
      name: 'ogTitle',
      type: 'string',
      title: 'Open Graph Title',
    }),
    defineField({
      name: 'ogDescription',
      type: 'text',
      title: 'Open Graph Description',
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Open Graph Image',
    }),
    defineField({
      name: 'ogUrl',
      type: 'url',
      title: 'Canonical URL',
    }),
    defineField({
      name: 'identityUrl',
      type: 'url',
      title: 'Identity URL',
      description: 'Netlify Identity / auth base URL',
    }),
  ],
})
