import { defineType, defineField } from 'sanity'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'pageSlug',
      type: 'string',
      title: 'Page',
      options: {
        list: [
          { title: 'About', value: 'about' },
          { title: 'About (Game)', value: 'aboutGame' },
          { title: 'Work', value: 'work' },
          { title: 'Writing', value: 'writing' },
          { title: 'Contact', value: 'contact' },
          { title: 'Contact (Game)', value: 'contactGame' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introText',
      type: 'text',
      title: 'Intro / Main content',
      description: 'Plain text or markdown for page intro',
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Content sections',
      description: 'For About page: "me" and "the site" tabs. Content supports markdown.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Section ID (e.g. me, site)' },
            { name: 'title', type: 'string', title: 'Section title' },
            {
              name: 'content',
              type: 'text',
              title: 'Content',
              description: 'Supports markdown formatting',
            },
          ],
        },
      ],
    }),
  ],
})
