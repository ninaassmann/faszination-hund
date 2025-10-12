import type { CollectionConfig } from 'payload'

export const Dogbreeds: CollectionConfig = {
  slug: 'dogbreeds',
  labels: {
    singular: 'Hunderasse',
    plural: 'Hunderassen',
  },
  admin: {
    useAsTitle: 'breed',
    defaultColumns: ['breed', 'status'],
    group: 'Hunde',
  },
  fields: [
    {
      name: 'breed',
      label: 'Hunderasse',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        placeholder: 'Name der Hunderasse',
        description: 'Gib hier die offizielle Bezeichnung der Rasse ein.',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      localized: false,
      admin: {
        placeholder: 'z.B. labrador-retriever',
        description: 'Gib hier einen Slug ein, der später für die Detailseite benutzt wird.',
      },
      hooks: {
        beforeValidate: [
          ({ data, operation, value }) => {
            if (data?.breed && (!value || operation === 'create')) {
              return data.breed
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { label: 'Entwurf', value: 'draft' },
        { label: 'Veröffentlicht', value: 'published' },
        { label: 'Teilveröffentlicht', value: 'partial' },
      ],
      defaultValue: 'draft',
      admin: {
        description:
          'Steuert, ob die Rasse auf der Website angezeigt wird und ob sie vollständig ist.',
      },
    },
    {
      name: 'general',
      label: 'Allgemein',
      type: 'group',
      fields: [
        {
          name: 'Weitere Namen',
          type: 'text',
          hasMany: true,
          admin: {
            placeholder: 'weitere bekannte Namen',
            description: 'Trage hier zusätzliche Namen ein, unter denen die Rasse bekannt ist.',
          },
        },
        {
          name: 'tags',
          label: 'Tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          admin: {
            placeholder: 'Wähle einen oder mehrere Tags',
            description: 'Schlagworte, z. B. Eigenschaften oder typische Nutzung.',
          },
        },
        {
          name: 'isHybrid',
          label: 'Hybrid / Mischling',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Aktivieren, wenn es sich um eine Hybrid- oder Mischlingsrasse handelt.',
          },
        },
        {
          name: 'parentBreeds',
          label: 'Elternrassen',
          type: 'relationship',
          relationTo: 'dogbreeds',
          hasMany: true,
          admin: {
            placeholder: 'Wähle die Elternrassen',
            description: 'Typische Rassen, die für diese Hybridrasse kombiniert wurden.',
            condition: (data) => !!data.general.isHybrid, // nur sichtbar, wenn isHybrid true
          },
        },
        {
          name: 'isVariant',
          label: 'Variante',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description:
              'Aktivieren, wenn dies eine Variante einer bestehenden Hunderasse ist. Alle nicht individuell ausgefüllten Felder werden von der Basisrasse übernommen.',
          },
        },
        {
          name: 'mainBreeds',
          label: 'Hauptrasse',
          type: 'relationship',
          relationTo: 'dogbreeds',
          admin: {
            description: 'Wähle die Hauptrasse, von der diese Variante abstammt.',
            condition: (data) => !!data.general.isVariant, // nur sichtbar, wenn isVariant true
          },
        },
        {
          name: 'variantBreeds',
          label: 'Varianten',
          type: 'relationship',
          relationTo: 'dogbreeds',
          hasMany: true,
          admin: {
            description: 'Wähle die bekannten Varianten dieser Hunderasse, falls vorhanden.',
            condition: (data) => !data.general.isVariant, // nur sichtbar, wenn isVariant false
          },
        },
      ],
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

    {
      name: 'fci',
      label: 'FCI Informationen',
      type: 'group',
      fields: [
        {
          name: 'fciStatus',
          type: 'select',
          label: 'FCI-Status',
          admin: {
            description:
              'Wähle den FCI-Status der Rasse. Wenn "Nicht anerkannt" ausgewählt wird, bleiben die übrigen FCI-Felder ausgeblendet, da diese Informationen nur für anerkannte oder provisorisch anerkannte Rassen relevant sind.',
          },
          options: [
            { label: 'Endgültig anerkannt', value: 'recognized' },
            { label: 'Provisorisch anerkannt', value: 'provisional' },
            { label: 'Nicht anerkannt', value: 'not_recognized' },
          ],
        },
        {
          name: 'fciAlert',
          type: 'ui',
          admin: {
            components: {
              Field: '@/components/fields/statusAlert#FciStatusAlert',
            },
          },
        },
        {
          name: 'fciGroup',
          label: 'FCI Gruppe',
          type: 'relationship',
          relationTo: 'fciGroups',
          admin: {
            placeholder: 'Wähle eine FCI-Gruppe',
            description: 'Die offizielle FCI-Gruppe, zu der die Rasse gehört.',
            condition: (data) => data.fci?.fciStatus !== 'not_recognized', // wird ausgeblendet, wenn der FCI Status "Nicht anerkannt" ist
          },
        },
        {
          name: 'fciSection',
          label: 'FCI Sektion',
          type: 'relationship',
          relationTo: 'fciSections',
          required: true,
          admin: {
            placeholder: 'Wähle eine FCI-Sektion',
            description: 'Die Sektion innerhalb der FCI-Gruppe, passend zur Rasse.',
            condition: (data) => {
              // zeigt das Feld nur an, wenn fciGroup gesetzt ist
              return !!data.fciGroup
            },
          },
          filterOptions: ({ data }) => {
            if (!data?.fciGroup) return true
            return {
              group: {
                equals: data.fciGroup,
              },
            }
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'fciAcceptanceDate',
              label: 'Datum der endgültigen Anerkennung der Rasse durch die FCI',
              type: 'date',
              admin: {
                description: 'Trage hier das Datum ein, andem die Rasse durch FCI anerkannt wurde',
                condition: (data) => data.fci?.fciStatus !== 'not_recognized', // wird ausgeblendet, wenn der FCI Status "Nicht anerkannt" ist
              },
            },
            {
              name: 'fciPublicationDate',
              label: 'Datum der Publikation des gültigen offiziellen Standards',
              type: 'date',
              admin: {
                description:
                  'Trage hier das Datum ein, von der Publikation des gültigen offiziellen Standards',
                condition: (data) => data.fci?.fciStatus !== 'not_recognized', // wird ausgeblendet, wenn der FCI Status "Nicht anerkannt" ist
              },
            },
          ],
        },
        {
          name: 'fciSource',
          label: 'Link zur FCI Seite der Rasse',
          type: 'text',
          admin: {
            description: 'Trage hier den Link zur Rasse ein.',
            condition: (data) => data.fci?.fciStatus !== 'not_recognized', // wird ausgeblendet, wenn der FCI Status "Nicht anerkannt" ist
          },
          validate: (value: string | null | undefined) => {
            if (!value) return true

            try {
              new URL(value)
              return true
            } catch {
              return 'Bitte eine gültige URL eingeben'
            }
          },
        },
        {
          name: 'fciSourcePDF',
          label: 'Link zum PDF',
          type: 'text',
          admin: {
            description: 'Trage hier den Link zum PDF des offiziellen Standard ein.',
            condition: (data) => data.fci?.fciStatus !== 'not_recognized', // wird ausgeblendet, wenn der FCI Status "Nicht anerkannt" ist
          },
          validate: (value: string | null | undefined) => {
            if (!value) return true

            try {
              new URL(value)
              return true
            } catch {
              return 'Bitte eine gültige URL eingeben'
            }
          },
        },
      ],
    },
    {
      name: 'details',
      label: 'Details',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'weight-female',
              label: 'Gewicht Hündin',
              type: 'number',
              admin: { description: 'Durchschnittliches Gewicht einer Hündin in kg.' },
            },
            {
              name: 'weight-male',
              label: 'Gewicht Rüde',
              type: 'number',
              admin: { description: 'Durchschnittliches Gewicht eines Rüden in kg.' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'height-female',
              label: 'Widerristhöhe Hündin',
              type: 'number',
              admin: { description: 'Durchschnittliche Widerristhöhe einer Hündin in cm.' },
            },
            {
              name: 'height-male',
              label: 'Widerristhöhe Rüde',
              type: 'number',
              admin: { description: 'Durchschnittliche Widerristhöhe eines Rüden in cm.' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'age-female',
              label: 'Lebenserwartung Hündin',
              type: 'text',
              admin: {
                description:
                  'Durchschnittliche Lebenserwartung einer Hündin in Jahren (von - bis).',
              },
            },
            {
              name: 'age-male',
              label: 'Lebenserwartung Rüde',
              type: 'text',
              admin: {
                description: 'Durchschnittliche Lebenserwartung eines Rüden in Jahren (von - bis).',
              },
            },
          ],
        },
        {
          name: 'coatColors',
          label: 'Fellfarbe',
          type: 'relationship',
          relationTo: 'coatColors',
          hasMany: true,
          admin: {
            placeholder: 'Wähle eine oder mehrere Fellfarben',
            description: 'Typische Fellfarben der Rasse. Mehrfachauswahl möglich.',
          },
        },
        {
          name: 'coatTypes',
          label: 'Felltyp',
          type: 'relationship',
          relationTo: 'coatTypes',
          admin: {
            placeholder: 'Wähle den Felltyp',
            description: 'Kurz, mittellang oder lang – charakteristisch für die Rasse.',
          },
        },
        {
          name: 'roles',
          label: 'Einsatzbereiche',
          type: 'relationship',
          relationTo: 'roles',
          hasMany: true,
          admin: {
            placeholder: 'Wähle die typischen Einsatzbereiche',
            description: 'Z. B. Jagdhund, Rettungshund, Therapiehund. Mehrfachauswahl möglich.',
          },
        },
        {
          name: 'origin',
          label: 'Herkunft',
          type: 'relationship',
          relationTo: 'countries',
          admin: {
            placeholder: 'Wähle das Herkunftsland',
            description: 'Land oder Region, aus der die Rasse ursprünglich stammt.',
          },
        },
      ],
    },
    {
      name: 'descriptions',
      label: 'Beschreibungen',
      type: 'group',
      fields: [
        {
          name: 'general',
          label: 'Allgemein',
          type: 'textarea',
          admin: {
            description: 'Allgemeine Informationen über Rasse, Herkunft und Besonderheiten.',
            rows: 4,
          },
        },
        {
          name: 'appearance',
          label: 'Aussehen',
          type: 'textarea',
          admin: {
            description: 'Größe, Gewicht, Felltyp, Farben, körperliche Merkmale.',
            rows: 4,
          },
        },
        {
          name: 'character',
          label: 'Charakter / Verhalten',
          type: 'textarea',
          admin: {
            description: 'Sozialverhalten, typische Eigenschaften, Temperament.',
            rows: 4,
          },
        },
        {
          name: 'training',
          label: 'Erziehung / Trainierbarkeit',
          type: 'textarea',
          admin: {
            description: 'Lernfähigkeit, Eignung für Anfänger, Gehorsam.',
            rows: 4,
          },
        },
        {
          name: 'roles',
          label: 'Einsatzbereiche',
          type: 'textarea',
          admin: {
            description: 'Typische Einsatzbereiche: Begleithund, Wachhund, Jagd, Assistenz etc.',
            rows: 4,
          },
        },
        {
          name: 'health',
          label: 'Gesundheit / Pflege',
          type: 'textarea',
          admin: {
            description: 'Gesundheit, Lebenserwartung, Fellpflege, Bewegung.',
            rows: 4,
          },
        },
        {
          name: 'funFacts',
          label: 'Besonderheiten / Fun Facts',
          type: 'textarea',
          admin: {
            description: 'Interessante Anekdoten oder historische Fakten zur Rasse.',
            rows: 3,
          },
        },
      ],
    },
    {
      name: 'breeders',
      label: 'Züchter',
      labels: {
        singular: 'Züchter',
        plural: 'Züchter',
      },
      type: 'array',
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
          admin: { placeholder: 'Name des Züchters oder Zwingers' },
        },
        {
          name: 'location',
          label: 'Ort / Region',
          type: 'text',
          admin: { placeholder: 'Stadt, Region oder Bundesland' },
        },
        {
          name: 'website',
          label: 'Webseite',
          type: 'text',
          admin: { placeholder: 'URL der Webseite' },
        },
        {
          name: 'contact',
          label: 'Kontakt',
          type: 'text',
          admin: {
            placeholder: 'E-Mail, Telefonnummer oder Social Media',
          },
        },
      ],
    },
    {
      name: 'influencers',
      label: 'Influencer',
      labels: {
        singular: 'Influencer',
        plural: 'Influencer',
      },
      type: 'array',
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'name',
          label: 'Name / Handle',
          type: 'text',
          required: true,
          admin: { placeholder: 'Name oder Social Media Handle' },
        },
        {
          name: 'platform',
          label: 'Plattform',
          type: 'select',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Andere', value: 'other' },
          ],
          admin: {
            placeholder: 'Wähle die Plattform des Influencers',
          },
        },
        {
          name: 'link',
          label: 'Link / Profil',
          type: 'text',
          admin: { placeholder: 'URL zum Profil oder zur Seite' },
        },
        {
          name: 'notes',
          label: 'Notizen',
          type: 'textarea',
          admin: {
            placeholder: 'Zusätzliche Infos oder Bemerkungen',
            rows: 2,
          },
        },
      ],
    },
  ],
}
