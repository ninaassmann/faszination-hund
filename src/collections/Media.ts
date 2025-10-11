import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Datei',
    plural: 'Dateien',
  },
  admin: {
    defaultColumns: ['alt', 'linkedDogbreeds'],
    group: 'Allgemein',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
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
      on: 'images.media',
      collection: 'dogbreeds',
    },
  ],
  upload: true,
}
