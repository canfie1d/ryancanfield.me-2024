import { defineType, defineField } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'meBio',
      type: 'text',
      title: 'Me Bio',
    }),
    defineField({
      name: 'siteBio',
      type: 'text',
      title: 'Site Bio',
    }),
    defineField({
      name: 'resumeUrl',
      type: 'file',
      title: 'Resume PDF',
      options: {
        accept: '.pdf',
      },
    }),
  ],
})
