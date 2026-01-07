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
      label: 'Infos zur Adoption',
      type: 'group',
      fields: [
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
        {
          name: 'adoptionDate',
          label: 'Datum der Adoption',
          type: 'date',
          admin: {
            condition: (data) => data.adoptionStatus == 'adopted',
          },
        },
        {
          name: 'adoptionDate',
          label: 'Datum der Adoption',
          type: 'date',
          admin: {
            condition: (data) => data.adoptionStatus == 'adopted',
          },
        },
      ],
    },

    // Infos zum Aufenthalt
    {
      label: 'Aufenthalt',
      type: 'group',
      fields: [
        {
          name: 'location',
          type: 'text',
          required: true,
        },
        {
          name: 'locationType',
          type: 'select',
          options: [
            { label: 'Pflegestelle', value: 'fosterHome' },
            { label: 'Tierheim', value: 'shelter' },
            { label: 'Tötungsstaion', value: 'euthanasiaCenter' },
          ],
        },
        {
          name: 'earliestArrivalDate',
          type: 'date',
          label: 'Frühestmögliche Ausreise',
          admin: {
            description: 'Ab diesem Datum ist eine Ausreise nach Deutschland frühestens möglich.',
          },
        },
        {
          name: 'earliestArrivalType',
          type: 'select',
          label: 'Angabe zur Ausreise',
          defaultValue: 'unknown',
          options: [
            { label: 'Termin festgelegt', value: 'fixed' },
            { label: 'Voraussichtlich möglich', value: 'estimated' },
            { label: 'Noch nicht absehbar', value: 'unknown' },
          ],
        },
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
