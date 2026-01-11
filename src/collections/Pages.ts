import { Accordion } from '@/blocks/Accordion/config'
import { Content } from '@/blocks/Content/config'
import { Hero } from '@/blocks/Hero/config'

import { slugify } from '@/utils/slugify'

import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Seite', plural: 'Seiten' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Inhalte',
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
      unique: true,
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
      name: 'hideBreadcrumps',
      label: 'Breadcrumps auf dieser Seite ausblenden',
      type: 'checkbox',
    },
    {
      name: 'content',
      label: 'Inhalte',
      type: 'blocks',
      blocks: [Content, Hero, Accordion],
    },
  ],
}
