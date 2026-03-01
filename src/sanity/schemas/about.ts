import { defineField, defineType, defineArrayMember } from 'sanity'

const aboutBlock = defineArrayMember({
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
          defineField({
            name: 'target',
            type: 'string',
            title: 'Target',
            options: { list: ['_blank', '_self'] },
          }),
        ],
      },
    ],
  },
})

export const about = defineType({
  name: 'about',
  title: 'About Content',
  type: 'document',
  fields: [
    defineField({
      name: 'meBio',
      type: 'array',
      title: '"Me" Tab Content',
      of: [aboutBlock],
    }),
    defineField({
      name: 'siteBio',
      type: 'array',
      title: '"The Site" Tab Content',
      of: [aboutBlock],
    }),
    defineField({
      name: 'metaText',
      type: 'string',
      title: 'Meta Section Text',
    }),
    defineField({
      name: 'metaCodeHint',
      type: 'string',
      title: 'Meta Code Hint',
    }),
    defineField({ name: 'resumeUrl', type: 'file', title: 'Resume PDF' }),
  ],
})
