import type { CollectionConfig } from 'payload'

export const dogbreeds: CollectionConfig = {
  slug: 'dogbreeds',
  labels: {
    singular: 'Hunderasse',
    plural: 'Hunderassen',
  },
  admin: {
    useAsTitle: 'breed',
    group: 'Hunde',
  },
  fields: [
    {
      name: 'breed',
      label: 'Hunderasse',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'image',
      label: 'Bild',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'fciGroup',
          label: 'FCI Gruppe',
          type: 'relationship',
          relationTo: 'fciGroups',
          required: true,
        },
        {
          name: 'fciSection',
          label: 'FCI Sektion',
          type: 'relationship',
          relationTo: 'fciSections',
          required: true,
          filterOptions: ({ data }) => {
            if (!data?.fciGroup) return true // kein Filter, wenn Gruppe noch nicht gewählt
            return {
              group: {
                equals: data.fciGroup, // nur Sektionen dieser Gruppe anzeigen
              },
            }
          },
        },
      ],
    },
  ],
}
