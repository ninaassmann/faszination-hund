import { Content } from '@/blocks/Content/config'
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
      admin: {
        description: 'Der Slug wird automatisch aus dem Namen des Hundes generiert.',
      },
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
    {
      name: 'images',
      label: 'Bilder',
      labels: {
        singular: 'Bild',
        plural: 'Bilder',
      },
      type: 'array',
      minRows: 0,
      maxRows: 20,
      validate: (value) => {
        const items = value as { media: string; type: 'thumbnail' | 'gallery' }[] | undefined
        if (!items) return true

        const thumbnails = items.filter((item) => item.type === 'thumbnail')
        if (thumbnails.length > 1) {
          return 'Es darf nur ein Thumbnail ausgewählt werden.'
        }
        return true
      },
      fields: [
        {
          name: 'media',
          label: 'Bild',
          type: 'relationship',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Wähle ein Bild aus der Media-Collection.',
          },
        },
        {
          name: 'type',
          label: 'Typ',
          type: 'select',
          required: true,
          options: [
            { label: 'Thumbnail', value: 'thumbnail' },
            { label: 'Galerie', value: 'gallery' },
          ],
          admin: {
            description:
              'Wähle aus, ob das Bild als Thumbnail oder in der Galerie angezeigt werden soll.',
          },
        },
      ],
    },

    // Infos zum Geschelcht
    {
      label: 'Geschlecht',
      type: 'group',
      fields: [
        {
          name: 'gender',
          label: 'Geschlecht',
          type: 'radio',
          options: [
            { label: 'Weiblich', value: 'female' },
            { label: 'Männlich', value: 'male' },
          ],
        },
        {
          name: 'castration',
          label: 'Kastration',
          type: 'radio',
          options: [
            { label: 'Ja', value: 'yes' },
            { label: 'Nein, zu jung', value: 'tooYoung' },
            { label: 'Nein', value: 'no' },
          ],
        },
        {
          name: 'castrationInfo',
          label: 'Infos zur Kastration',
          type: 'text',
          admin: {
            description: 'Trage hier weitere Infos zur Kastration.',
          },
        },
      ],
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
      ],
    },

    // Infos zum Aufenthalt
    {
      label: 'Aufenthalt',
      type: 'group',
      fields: [
        {
          name: 'location',
          label: 'Aktueller Aufenthalt',
          type: 'text',
          required: true,
        },
        {
          name: 'locationType',
          label: 'Aufenthaltstyp',
          type: 'select',
          options: [
            { label: 'Pflegestelle', value: 'fosterHome' },
            { label: 'Tierheim', value: 'shelter' },
            { label: 'Tötungsstation', value: 'euthanasiaCenter' },
          ],
        },
        {
          name: 'earliestArrivalType',
          label: 'Angabe zur Ausreise',
          type: 'select',
          defaultValue: 'unknown',
          options: [
            { label: 'Termin festgelegt', value: 'fixed' },
            { label: 'Voraussichtlich möglich', value: 'estimated' },
            { label: 'Noch nicht absehbar', value: 'unknown' },
          ],
        },
        {
          name: 'earliestArrivalDate',
          type: 'date',
          label: 'Frühestmögliche Ausreise',
          admin: {
            description: 'Ab diesem Datum ist eine Ausreise nach Deutschland frühestens möglich.',
            condition: (data) => data.earliestArrivalType != 'unknown',
          },
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
          admin: {
            description: 'Wähle mehrere Rassen, wenn nötig.',
          },
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

    // Beschreibungstext
    {
      name: 'description',
      label: 'Beschreibung',
      labels: {
        singular: 'Beschreibung',
        plural: 'Beschreibungen',
      },
      type: 'blocks',
      blocks: [Content],
    },
  ],
}
