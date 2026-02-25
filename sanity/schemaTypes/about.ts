import { defineType, defineField, defineArrayMember } from 'sanity'

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
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'meBio',
      type: 'array',
      title: '"Me" Tab Content',
      description: 'Content for the "me" tab. Use H2 for the section heading.',
      of: [aboutBlock],
    }),
    defineField({
      name: 'siteBio',
      type: 'array',
      title: '"The Site" Tab Content',
      description: 'Content for "the site" tab. Includes theming, motion, features, and meta sections.',
      of: [aboutBlock],
    }),
    defineField({
      name: 'metaText',
      type: 'string',
      title: 'Meta Section Text',
      description: 'Text for the meta section (last 9 chars get the falling animation)',
    }),
    defineField({
      name: 'metaCodeHint',
      type: 'string',
      title: 'Meta Code Hint',
      description: 'Code snippet shown in meta section, e.g. "Type lore() in the console"',
    }),
    defineField({
      name: 'resumeUrl',
      type: 'file',
      title: 'Resume PDF',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'tabLabelMe',
      type: 'string',
      title: 'Tab label: Me',
      initialValue: 'me',
    }),
    defineField({
      name: 'tabLabelSite',
      type: 'string',
      title: 'Tab label: The Site',
      initialValue: 'the site',
    }),
    defineField({
      name: 'lorePrompt',
      type: 'string',
      title: 'Lore: Initial prompt',
      description: "You don't know how long this will take...",
    }),
    defineField({
      name: 'loreYes',
      type: 'string',
      title: 'Lore: Yes/no prompt',
      description: 'yes()? no()?',
    }),
    defineField({
      name: 'loreNo',
      type: 'string',
      title: 'Lore: no() response',
    }),
  ],
})
