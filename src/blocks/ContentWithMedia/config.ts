import { Block } from 'payload'

export const ContentWithMedia: Block = {
  slug: 'contentWithMedia',
  interfaceName: 'ContentWithMedia',
  labels: {
    singular: 'Text mit Bild',
    plural: 'Texte mit Bild',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'headline',
              label: 'Überschrift',
              type: 'text',
              required: true,
            },
            {
              name: 'headlineLevel',
              label: 'Überschrifts-Ebene',
              type: 'select',
              options: [
                { label: 'H2', value: 'h2' },
                { label: 'H3', value: 'h3' },
              ],
              defaultValue: 'h2',
              admin: {
                description:
                  'Wähle die HTML-Überschriftsebene. H2 für Hauptabschnitte, H3 für Unterabschnitte.',
              },
            },
            {
              name: 'text',
              label: 'Text',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              label: 'Bild',
              type: 'group',
              fields: [
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'alt',
                  label: 'Alternativtext (optional)',
                  type: 'text',
                  admin: {
                    description: 'Überschreibt ggf. den Alt-Text aus der Media-Collection.',
                  },
                },
                {
                  name: 'caption',
                  label: 'Bildunterschrift (optional)',
                  type: 'text',
                },
              ],
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
                { label: 'Allgemein', value: 'var(--frontend-general)' },
                { label: 'Primary', value: 'var(--frontend-primary)' },
                { label: 'Secondary', value: 'var(--frontend-secondary)' },
                { label: 'Hell', value: 'var(--frontend-base-200)' },
                { label: 'Dunkel', value: 'var(--frontend-neutral)' },
              ],
              defaultValue: 'var(--frontend-general)',
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
              ],
              defaultValue: 'left',
            },
          ],
        },
      ],
    },
  ],
}
