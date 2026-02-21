import { defineField, defineType } from 'sanity'

// Portable Text block definition for rich content
const blockContent = {
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Strikethrough', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({ name: 'href', type: 'url', title: 'URL' }),
              defineField({ name: 'target', type: 'string', title: 'Target', options: { list: ['_blank', '_self'] } }),
            ]
          }
        ]
      }
    }
  ]
}

export const about = defineType({
  name: 'about',
  title: 'About Content',
  type: 'document',
  // Singleton — only one document of this type should exist
  fields: [
    defineField({ name: 'meBio', title: '"Me" Tab Content', ...blockContent }),
    defineField({ name: 'siteBio', title: '"The Site" Tab Content', ...blockContent }),
    defineField({ name: 'resumeUrl', type: 'file', title: 'Resume PDF' }),
  ]
})
