import { Block } from 'payload'

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'Accordion',
  labels: {
    singular: 'Akkordeon',
    plural: 'Akkordeons',
  },
  fields: [
    {
      name: 'title',
      label: 'Überschrift',
      type: 'text',
    },
    {
      name: 'text',
      label: 'Text',
      type: 'textarea',
    },
    {
      name: 'accordions',
      label: 'Akkordeons',
      labels: {
        singular: 'Eintrag',
        plural: 'Einträge',
      },
      admin: {
        initCollapsed: true,
      },
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Titel',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          label: 'Text',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
