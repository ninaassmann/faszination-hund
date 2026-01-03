import type { CollectionConfig } from 'payload'

export const FciSections: CollectionConfig = {
  slug: 'fciSections',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'FCI Sektion',
    plural: 'FCI Sektionen',
  },
  admin: {
    hidden: true,
    useAsTitle: 'name',
    defaultColumns: ['number', 'name'],
    group: 'Hunde',
  },
  defaultSort: 'group.number',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'number',
      label: 'Nummer',
      type: 'number',
      required: true,
    },
    {
      name: 'group',
      label: 'Zugehörige Gruppe',
      type: 'relationship',
      relationTo: 'fciGroups',
      required: true,
    },
  ],
}
