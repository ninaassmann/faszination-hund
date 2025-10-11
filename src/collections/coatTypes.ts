import type { CollectionConfig } from 'payload'

export const coatTypes: CollectionConfig = {
  slug: 'coatTypes',
  labels: {
    singular: 'Felltyp',
    plural: 'Felltypen',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Hunde',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
    },
    {
      name: 'value',
      type: 'text',
      label: 'Value',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      admin: {
        placeholder: 'Kurze Beschreibung des Felltyps, z.B. Pflegeaufwand, typische Rassen...',
      },
    },
    {
      name: 'dogbreeds',
      label: 'Hunderassen',
      type: 'relationship',
      relationTo: 'dogbreeds',
      hasMany: true,
      admin: {
        placeholder: 'Hier können Rassen ausgewählt werden, die diesen Felltyp haben.',
      },
    },
  ],
}
