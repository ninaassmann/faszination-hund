import type { CollectionConfig } from 'payload'

export const countries: CollectionConfig = {
  slug: 'countries',
  labels: {
    singular: 'Herkunftsland',
    plural: 'Herkunftsländer',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'continent'],
    group: 'Hunde',
  },
  fields: [
    {
      name: 'name',
      label: 'Land',
      type: 'text',
      required: true,
    },
    {
      name: 'continent',
      label: 'Kontinent',
      type: 'select',
      options: [
        { label: 'Europa', value: 'europe' },
        { label: 'Asien', value: 'asia' },
        { label: 'Afrika', value: 'africa' },
        { label: 'Nordamerika', value: 'north_america' },
        { label: 'Südamerika', value: 'south_america' },
        { label: 'Australien/Ozeanien', value: 'oceania' },
      ],
    },
    {
      name: 'dogbreeds',
      label: 'Hunderassen',
      type: 'relationship',
      relationTo: 'dogbreeds',
      hasMany: true,
    },
  ],
}
