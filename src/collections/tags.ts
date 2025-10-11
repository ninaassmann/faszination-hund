import type { CollectionConfig } from 'payload'

export const tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Tag',
    plural: 'Tags',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'group'],
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
      name: 'group',
      label: 'Gruppe',
      type: 'select',
      admin: {
        placeholder: 'Wähle eine Gruppe als Überbegriff',
      },
      options: [
        { label: 'Training', value: 'training' },
        { label: 'Charakter', value: 'character' },
        { label: 'Sozial', value: 'social' },
        { label: 'Gesundheit', value: 'health' },
        { label: 'Nutzung', value: 'usage' },
        { label: 'Verhalten', value: 'behavior' },
      ],
    },
  ],
}
