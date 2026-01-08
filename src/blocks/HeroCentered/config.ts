import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { validateUrl } from '@/utils/validateUrl'

export const HeroCentered: Block = {
  slug: 'heroCentered',
  interfaceName: 'HeroCentered',
  labels: {
    singular: 'Hero - Zentriert',
    plural: 'Heroes - Zentriert',
  },
  fields: [
    {
      name: 'text',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'buttons',
      type: 'array',
      fields: [
        {
          name: 'ctaType',
          type: 'select',
          options: [
            { label: 'Intern', value: 'intern' },
            { label: 'Extern', value: 'extern' },
          ],
        },
        {
          name: 'ctaIntern',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (data) => data.ctaType == 'intern',
          },
        },
        {
          name: 'ctaExtern',
          type: 'text',
          validate: validateUrl,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
