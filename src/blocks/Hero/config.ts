import type { Block } from 'payload'
import { validateUrl } from '@/utils/validateUrl'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'Hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'variant',
              type: 'select',
              required: true,
              options: [
                { label: 'Stacked Layout', value: 'stacked' },
                { label: 'Split Layout', value: 'split' },
                { label: 'Bild als Hintergrund', value: 'imageBackground' },
              ],
            },
            {
              name: 'stackedHint',
              type: 'ui',
              admin: {
                components: {
                  Field: {
                    path: '@/components/fields/statusAlert#StatusAlert',
                    clientProps: {
                      text: 'Bei der stacked Variante befindet sich das Bild unterhalb des Textes',
                      variant: 'info',
                    },
                  },
                },
                condition: (data, siblingData) => siblingData?.variant == 'stacked',
              },
            },
            {
              name: 'eyebrow',
              label: 'Eyebrow',
              type: 'text',
              admin: {
                description: 'Dieser Text wird oberhalb der Überschrift ausgegeben',
              },
            },
            {
              name: 'headline',
              label: 'Überschrift',
              type: 'text',
              required: true,
              admin: {
                description:
                  'Dies wird die H1 auf der Seite sein. Denk dran, es sollte immer nur eine H1 pro Seite geben',
              },
            },
            {
              name: 'text',
              label: 'Text',
              type: 'textarea',
            },
            {
              name: 'ctas',
              label: 'Buttons',
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
                  required: true,
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
                    condition: (data, siblingData) => {
                      return siblingData?.type === 'intern'
                    },
                  },
                },
                {
                  name: 'extern',
                  type: 'text',
                  validate: validateUrl,
                  admin: {
                    condition: (data, siblingData) => {
                      return siblingData?.type === 'extern'
                    },
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
              admin: {
                description: 'Optional. Wird je nach Variante unterschiedlich dargestellt',
              },
            },
          ],
        },
        {
          label: 'Layout',
          fields: [
            {
              name: 'backgroundColor',
              label: 'Hintergrundfarbe',
              type: 'select',
              options: [
                { label: 'Primary', value: 'var(--frontend-primary)' },
                { label: 'Secondary', value: 'var(--frontend-secondary)' },
                { label: 'Hell', value: 'var(--frontend-base-200)' },
                { label: 'Dunkel', value: 'var(--frontend-neutral)' },
              ],
            },
            {
              name: 'colorInfo',
              type: 'ui',
              admin: {
                components: {
                  Field: {
                    path: '@/components/fields/colorBox#ColorBox',
                  },
                },
              },
            },
            {
              name: 'textPosition',
              label: 'Textposition',
              type: 'select',
              options: [
                { label: 'Links', value: 'left' },
                { label: 'Rechts', value: 'right' },
                { label: 'Zentriert', value: 'center' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
