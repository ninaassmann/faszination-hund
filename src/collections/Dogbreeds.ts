import type { CollectionConfig } from 'payload'
import { slugify } from '@/utils/slugify'

export const Dogbreeds: CollectionConfig = {
  slug: 'dogbreeds',
  access: {
    read: () => true,
  },
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
              return slugify(data.breed)
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
          hooks: {
            beforeValidate: [
              ({ value }) => {
                if (!value || !Array.isArray(value)) return value
                const trimmedNames = value.map((name) => name.trim())
                const nonEmptyNames = trimmedNames.filter((name) => name.length > 0)

                const namesWithSlugs = nonEmptyNames.map((name) => ({
                  name,
                  slug: name
                    .toLowerCase()
                    .trim()
                    .replace(/ä/g, 'ae')
                    .replace(/ö/g, 'oe')
                    .replace(/ü/g, 'ue')
                    .replace(/ß/g, 'ss')
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-'),
                }))

                return namesWithSlugs
              },
            ],
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
          name: 'mixedAlert',
          type: 'ui',
          admin: {
            components: {
              Field: {
                path: '@/components/fields/statusAlert#StatusAlert',
                clientProps: {
                  text: 'Diese Rasse ist einHybrid / Mischling.',
                  variant: 'info',
                },
              },
            },
            condition: (data) => data.general?.isHybrid,
          },
        },
        {
          name: 'isVariant',
          label: 'Variante',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Aktivieren, wenn dies eine Variante einer bestehenden Hunderasse ist.',
            condition: (data) => !data.general?.isHybrid,
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
          name: 'variantAlert',
          type: 'ui',
          admin: {
            components: {
              Field: {
                path: '@/components/fields/statusAlert#StatusAlert',
                clientProps: {
                  text: 'Diese Rasse ist eine Variante. Alle nicht individuell ausgefüllten Felder werden von der Basisrasse übernommen.',
                  variant: 'info',
                },
              },
            },
            condition: (data) => data.general?.isVariant,
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
              Field: {
                path: '@/components/fields/statusAlert#StatusAlert',
                clientProps: {
                  text: 'Diese Rasse ist von der FCI nicht anerkannt.',
                  variant: 'info',
                },
              },
            },
            condition: (data) => data.fci?.fciStatus == 'not_recognized', // wird ausgeblendet, wenn der FCI Status "Nicht anerkannt" ist
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
              return !!data.fci?.fciGroup
            },
          },
          filterOptions: ({ data }) => {
            const group = data?.fci?.fciGroup

            if (!group) return true

            return {
              group: {
                equals: typeof group === 'object' ? group.id : group,
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
              type: 'text',
              admin: { description: 'Durchschnittliches Gewicht einer Hündin in kg.' },
              hooks: {
                beforeValidate: [
                  ({ value }) => {
                    if (!value) return value
                    let trimmed = value.trim()

                    const regex = /^\d+(\s*-\s*\d+)?$/
                    if (!regex.test(trimmed)) {
                      console.warn(
                        `Gewicht "${trimmed}" entspricht nicht dem Format "25" oder "25-30".`,
                      )
                    }

                    if (!trimmed.toLowerCase().endsWith('kg')) {
                      trimmed = `${trimmed} kg`
                    }

                    return trimmed
                  },
                ],
              },
            },
            {
              name: 'weight-male',
              label: 'Gewicht Rüde',
              type: 'text',
              admin: { description: 'Durchschnittliches Gewicht eines Rüden in kg.' },
              hooks: {
                beforeValidate: [
                  ({ value }) => {
                    if (!value) return value
                    let trimmed = value.trim()

                    const regex = /^\d+(\s*-\s*\d+)?$/
                    if (!regex.test(trimmed)) {
                      console.warn(
                        `Gewicht "${trimmed}" entspricht nicht dem Format "25" oder "25-30".`,
                      )
                    }

                    if (!trimmed.toLowerCase().endsWith('kg')) {
                      trimmed = `${trimmed} kg`
                    }

                    return trimmed
                  },
                ],
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'height-female',
              label: 'Widerristhöhe Hündin',
              type: 'text',
              admin: { description: 'Durchschnittliche Widerristhöhe einer Hündin in cm.' },
              hooks: {
                beforeValidate: [
                  ({ value }) => {
                    if (!value) return value
                    let trimmed = value.trim()
                    const regex = /^\d+(\s*-\s*\d+)?$/
                    if (!regex.test(trimmed)) {
                      console.warn(
                        `Widerristhöhe "${trimmed}" entspricht nicht dem Format "55" oder "55-60".`,
                      )
                    }
                    if (!trimmed.toLowerCase().endsWith('cm')) {
                      trimmed = `${trimmed} cm`
                    }
                    return trimmed
                  },
                ],
              },
            },
            {
              name: 'height-male',
              label: 'Widerristhöhe Rüde',
              type: 'text',
              admin: { description: 'Durchschnittliche Widerristhöhe eines Rüden in cm.' },
              hooks: {
                beforeValidate: [
                  ({ value }) => {
                    if (!value) return value
                    let trimmed = value.trim()
                    const regex = /^\d+(\s*-\s*\d+)?$/
                    if (!regex.test(trimmed)) {
                      console.warn(
                        `Widerristhöhe "${trimmed}" entspricht nicht dem Format "55" oder "55-60".`,
                      )
                    }
                    if (!trimmed.toLowerCase().endsWith('cm')) {
                      trimmed = `${trimmed} cm`
                    }
                    return trimmed
                  },
                ],
              },
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
                description: 'Durchschnittliche Lebenserwartung einer Hündin in Jahren.',
              },
              hooks: {
                beforeValidate: [
                  ({ value }) => {
                    if (!value) return value

                    let trimmed = value.trim()
                    const regex = /^\d+\s*-\s*\d+$/
                    if (!regex.test(trimmed)) {
                      console.warn(
                        `Lebenserwartung "${trimmed}" entspricht nicht dem Format "6-8".`,
                      )
                    }

                    if (!trimmed.toLowerCase().endsWith('jahre')) {
                      trimmed = `${trimmed} Jahre`
                    }

                    return trimmed
                  },
                ],
              },
            },
            {
              name: 'age-male',
              label: 'Lebenserwartung Rüde',
              type: 'text',
              admin: {
                description: 'Durchschnittliche Lebenserwartung eines Rüden in Jahren.',
              },
              hooks: {
                beforeValidate: [
                  ({ value }) => {
                    if (!value) return value

                    let trimmed = value.trim()
                    const regex = /^\d+\s*-\s*\d+$/
                    if (!regex.test(trimmed)) {
                      console.warn(
                        `Lebenserwartung "${trimmed}" entspricht nicht dem Format "6-8".`,
                      )
                    }

                    if (!trimmed.toLowerCase().endsWith('jahre')) {
                      trimmed = `${trimmed} Jahre`
                    }

                    return trimmed
                  },
                ],
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
          hasMany: true,
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
      labels: {
        singular: 'Beschreibung',
        plural: 'Beschreibungen',
      },
      type: 'array',
      minRows: 0,
      fields: [
        {
          name: 'title',
          label: 'Überschrift',
          type: 'text',
          required: true,
          admin: { placeholder: 'z.B. Allgemein, Aussehen, Charakter, Fun Facts...' },
        },
        {
          name: 'content',
          label: 'Text',
          type: 'textarea',
          required: true,
          admin: {
            placeholder: 'Hier den Text eingeben',
            rows: 4,
          },
        },
        {
          name: 'source',
          label: 'Quelle',
          type: 'text',
          admin: {
            placeholder: 'Link oder Referenz zur Quelle',
            description: 'Optional: Quelle angeben, z. B. FCI PDF, Wikipedia, Zuchtverein',
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
