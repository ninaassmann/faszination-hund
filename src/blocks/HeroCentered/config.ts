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
      name: 'content',
      label: 'Textinhalt',
      type: 'richText',
      admin: {
        description: 'Überschrift und optionaler Text für den Hero-Bereich.',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'cta',
      type: 'array',
      labels: {
        singular: 'Button',
        plural: 'Buttons',
      },
      maxRows: 2,
      fields: [
        {
          name: 'label',
          label: 'Button-Text',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Intern', value: 'intern' },
            { label: 'Extern', value: 'extern' },
          ],
        },
        {
          name: 'intern',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (data) => data.ctaType == 'intern',
          },
        },
        {
          name: 'extern',
          type: 'text',
          validate: validateUrl,
          admin: {
            condition: (data) => data.ctaType == 'extern',
          },
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'ghost', value: 'ghost' },
          ],
          defaultValue: 'primary',
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
