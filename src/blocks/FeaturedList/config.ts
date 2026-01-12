import { Block } from 'payload'

export const FeaturedList: Block = {
  slug: 'featuredList',
  interfaceName: 'FeaturedList',
  labels: {
    singular: 'Featured Liste',
    plural: 'Featured Listen',
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
      name: 'type',
      label: 'Was soll angezeigt werden?',
      type: 'select',
      required: true,
      options: [
        { label: 'Hunderassen', value: 'dogbreeds' },
        { label: 'Zu vermittelnde Hunde', value: 'dogs' },
      ],
      defaultValue: { label: 'Hunderassen', value: 'dogbreeds' },
    },

    {
      name: 'featuredBreeds',
      label: 'Hunderassen',
      type: 'relationship',
      relationTo: 'dogbreeds',
      hasMany: true,
      maxRows: 3,
      admin: {
        condition: (data, siblingData) => siblingData?.type === 'dogbreeds',
        description: 'Wähle bis zu 3 Hunderassen aus, die hervorgehoben werden sollen.',
      },
    },
    {
      name: 'featuredDogs',
      label: 'Zu vermittelnde Hunde',
      type: 'relationship',
      relationTo: 'dogs',
      hasMany: true,
      maxRows: 3,
      admin: {
        condition: (data, siblingData) => siblingData?.type === 'dogs',
        description: 'Wähle bis zu 3 Hunde aus, die hervorgehoben werden sollen.',
      },
    },
    {
      name: 'showButton',
      label: 'Button zur Übersicht anzeigen',
      type: 'checkbox',
      admin: {
        description: 'Der Button führt dann auf die jeweilige Übersichtsseite.',
      },
    },
  ],
}
