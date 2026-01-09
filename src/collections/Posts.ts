import { Content } from '@/blocks/Content/config'
import { Hero } from '@/blocks/Hero/config'
import { slugify } from '@/utils/slugify'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Beitrag',
    plural: 'Beiträge',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt'],
    group: 'Inhalte',
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      hooks: {
        beforeValidate: [
          ({ data, value, operation }) => {
            if (data?.title && (!value || operation === 'create')) {
              return slugify(data.title)
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
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Entwurf', value: 'draft' },
        { label: 'Veröffentlicht', value: 'published' },
      ],
    },
    {
      name: 'publishedAt',
      label: 'Veröffentlichungsdatum',
      type: 'date',
      admin: {
        condition: (data) => data.status === 'published',
      },
    },
    {
      name: 'heroImage',
      label: 'Titelbild',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      label: 'Inhalt',
      labels: {
        singular: 'Inhalt',
        plural: 'Inhalte',
      },
      type: 'blocks',
      blocks: [Hero, Content],
    },
    {
      name: 'relatedBreeds',
      label: 'Zugehörige Hunderassen',
      type: 'relationship',
      relationTo: 'dogbreeds',
      hasMany: true,
    },
    {
      name: 'sources',
      label: 'Quellen',
      labels: {
        singular: 'Quelle',
        plural: 'Quellen',
      },
      type: 'array',
      minRows: 0,
      fields: [
        {
          name: 'label',
          label: 'Bezeichnung',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'Link',
          type: 'text',
          validate: (value: string | null | undefined) => {
            if (!value) return true
            try {
              new URL(value)
              return true
            } catch {
              return 'Bitte eine gültige URL angeben'
            }
          },
        },
      ],
    },
  ],
}
