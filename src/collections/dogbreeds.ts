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
      admin: {
        placeholder: 'Name der Hunderasse',
        description: 'Gib hier die offizielle Bezeichnung der Rasse ein.',
      },
    },
    {
      name: 'thumbnail',
      label: 'Bild',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Wähle ein Hauptbild für die Rasse aus.',
      },
    },
    {
      name: 'images',
      label: 'Galerie',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: {
        description: 'Weitere Bilder der Rasse zur Galerie hinzufügen.',
      },
    },
    {
      name: 'fciGroup',
      label: 'FCI Gruppe',
      type: 'relationship',
      relationTo: 'fciGroups',
      required: true,
      admin: {
        placeholder: 'Wähle eine FCI-Gruppe',
        description: 'Die offizielle FCI-Gruppe, zu der die Rasse gehört.',
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
          name: 'colors',
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
          name: 'coat',
          label: 'Felltyp',
          type: 'relationship',
          relationTo: 'coatTypes',
          admin: {
            placeholder: 'Wähle den Felltyp',
            description: 'Kurz, mittellang oder lang – charakteristisch für die Rasse.',
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
        {
          name: 'usage',
          label: 'Einsatzbereiche',
          type: 'relationship',
          relationTo: 'roles',
          hasMany: true,
          admin: {
            placeholder: 'Wähle die typischen Einsatzbereiche',
            description: 'Z. B. Jagdhund, Rettungshund, Therapiehund. Mehrfachauswahl möglich.',
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
          name: 'usage',
          label: 'Nutzung / Aufgaben',
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
      type: 'array',
      minRows: 0,
      maxRows: 10,
      labels: {
        singular: 'Züchter',
        plural: 'Züchter',
      },
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
      type: 'array',
      minRows: 0,
      maxRows: 10,
      labels: {
        singular: 'Influencer',
        plural: 'Influencer',
      },
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
