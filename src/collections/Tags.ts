import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Tag',
    plural: 'Tags',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'group', 'linkedDogbreeds'],
    group: 'Hunde',
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      label: 'Kategorie',
      type: 'select',
      admin: {
        placeholder: 'Wähle eine Kategorie als Überbegriff',
      },
      options: [
        { label: 'Größen', value: 'size' },
        { label: 'Training', value: 'training' },
        { label: 'Charakter', value: 'character' },
        { label: 'Sozial', value: 'social' },
        { label: 'Gesundheit', value: 'health' },
        { label: 'Einsatzbereiche', value: 'roles' },
        { label: 'Verhalten', value: 'behavior' },
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
      on: 'general.tags',
      collection: 'dogbreeds',
    },
  ],
}
