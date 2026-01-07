import { slugify } from '@/utils/slugify'
import { CollectionConfig } from 'payload'

export const Dogs: CollectionConfig = {
  slug: 'dogs',
  access: {
    read: () => true,
  },
  labels: {
    singular: 'Hund',
    plural: 'Hunde',
  },
  admin: {
    useAsTitle: 'name',
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
      name: 'slug',
      label: 'Slug',
      type: 'text',
      localized: false,
      hooks: {
        beforeValidate: [
          ({ data, operation, value }) => {
            if (data?.name && (!value || operation === 'create')) {
              return slugify(data.name)
            }
            return value
          },
        ],
      },
    },

    // Infos zum Adoptionsstatus
    {
      name: 'adoptionStatus',
      label: 'Adoptionsstatus',
      type: 'select',
      options: [
        { label: 'Vermittelbar', value: 'available' },
        { label: 'Reserviert', value: 'reserved' },
        { label: 'Vermittelt', value: 'adopted' },
      ],
    },

    // Infos zum Geburtsdatum
    {
      label: 'Geburtstag',
      type: 'group',
      fields: [
        {
          name: 'birthDate',
          type: 'date',
          label: 'Geburtsdatum',
        },
        {
          name: 'birthDateType',
          type: 'select',
          label: 'Angabe zum Geburtsdatum',
          options: [
            { label: 'Geburtsdatum bekannt', value: 'exact' },
            { label: 'Geburtsdatum geschätzt', value: 'estimated' },
            { label: 'Geburtsdatum unbekannt', value: 'unknown' },
          ],
          defaultValue: 'unknown',
        },
      ],
    },

    // Infos zu den Hunderassen
    {
      label: 'Hunderasse',
      type: 'group',
      fields: [
        {
          name: 'breeds',
          label: 'Hunderasse',
          type: 'relationship',
          relationTo: 'dogbreeds',
          hasMany: true,
        },
        {
          name: 'breedType',
          label: 'Angabe zu den Hunderassen',
          type: 'select',
          options: [
            { label: 'Rasse bekannt', value: 'known' },
            { label: 'Rasse geschätzt', value: 'estimated' },
            { label: 'Rasse unbekannt', value: 'unknown' },
          ],
          defaultValue: 'unknown',
        },
      ],
    },
  ],
}
