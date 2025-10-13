import type { CollectionConfig } from 'payload'

export const Roles: CollectionConfig = {
  slug: 'roles',
  labels: {
    singular: 'Einsatzgebiet',
    plural: 'Einsatzgebiete',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'linkedDogbreeds'],
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
      unique: true,
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
    },
    {
      name: 'trainingRequirements',
      type: 'array',
      label: 'Trainingsanforderungen',
      labels: {
        singular: 'Anforderung',
        plural: 'Anforderungen',
      },
      fields: [
        {
          name: 'requirement',
          type: 'text',
          label: 'Anforderung',
          required: true,
        },
        {
          name: 'importance',
          type: 'select',
          label: 'Wichtigkeit',
          options: [
            { value: 'low', label: 'Niedrig' },
            { value: 'medium', label: 'Mittel' },
            { value: 'high', label: 'Hoch' },
          ],
          defaultValue: 'medium',
        },
      ],
    },
    {
      name: 'dogbreeds',
      label: 'Hunderassen',
      type: 'relationship',
      relationTo: 'dogbreeds',
      hasMany: true,
    },
    {
      name: 'linkedDogbreeds',
      label: 'Verlinkung',
      type: 'join',
      on: 'details.roles',
      collection: 'dogbreeds',
    },
  ],
}
