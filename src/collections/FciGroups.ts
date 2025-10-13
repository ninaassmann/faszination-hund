import type { CollectionConfig } from 'payload'

export const FciGroups: CollectionConfig = {
  slug: 'fciGroups',
  labels: {
    singular: 'FCI Gruppe',
    plural: 'FCI Gruppen',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['number', 'name'],
    group: 'Hunde',
  },
  defaultSort: 'number',
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
  ],
}
