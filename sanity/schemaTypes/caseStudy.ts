import { defineType, defineField, defineArrayMember } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'string',
      title: 'Slug ID',
      description: 'Used in URL path, e.g. freightweb',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'External link',
    }),
    defineField({
      name: 'problem',
      type: 'object',
      fields: [
        defineField({
          name: 'content',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'images',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'src', type: 'url', title: 'Image URL' },
                { name: 'caption', type: 'string' },
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'solution',
      type: 'object',
      fields: [
        defineField({
          name: 'content',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'images',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'src', type: 'url', title: 'Image URL' },
                { name: 'caption', type: 'string' },
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'result',
      type: 'object',
      fields: [
        defineField({
          name: 'content',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'images',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                { name: 'src', type: 'url', title: 'Image URL' },
                { name: 'caption', type: 'string' },
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'additionalImages',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'src', type: 'url', title: 'Image URL' },
            { name: 'caption', type: 'string' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
    }),
    defineField({
      name: 'videoPoster',
      type: 'url',
    }),
  ],
})
