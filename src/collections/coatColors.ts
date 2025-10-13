import type { CollectionConfig } from 'payload'

export const CoatColors: CollectionConfig = {
  slug: 'coatColors',
  labels: {
    singular: 'Fellfarbe',
    plural: 'Fellfarben',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'group', 'linkedDogbreeds'],
    group: 'Hunde',
  },
  fields: [
    {
      name: 'name',
      label: 'Farbe',
      type: 'text',
      required: true,
    },
    {
      name: 'colorCode',
      label: 'Farbcode',
      type: 'text',
      hasMany: true,
      admin: {
        placeholder: 'Trage einen oder mehrere Hex-Codes ein',
      },
    },

    {
      name: 'group',
      label: 'Gruppe',
      type: 'select',
      admin: {
        placeholder: 'Wähle eine Gruppe',
      },
      options: [
        {
          label: 'Einfarbig',
          value: 'solid',
        },
        {
          label: 'Mehrfarbig',
          value: 'multi',
        },
        {
          label: 'Muster',
          value: 'pattern',
        },
      ],
    },
    {
      name: 'dogbreeds',
      label: 'Hunderassen',
      type: 'relationship',
      relationTo: 'dogbreeds',
      hasMany: true,
    },
    {
      name: 'linkedDogbreeds',
      label: 'Verlinkung',
      type: 'join',
      on: 'details.coatColors',
      collection: 'dogbreeds',
    },
  ],
}
