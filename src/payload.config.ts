import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'

import { fileURLToPath } from 'url'

import { en } from '@payloadcms/translations/languages/en'
import { de } from '@payloadcms/translations/languages/de'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { FciGroups } from './collections/FciGroups'
import { FciSections } from './collections/FciSections'
import { Dogbreeds } from './collections/Dogbreeds'
import { Tags } from './collections/Tags'
import { CoatColors } from './collections/CoatColors'
import { CoatTypes } from './collections/CoatTypes'
import { Countries } from './collections/Countries'
import { Roles } from './collections/Roles'
import { Settings } from './globals/config'
import { Posts } from './collections/Posts'
import { Dogs } from './collections/Dogs'
import { Pages } from './collections/Pages'
import { PayloadIcon } from '@payloadcms/ui'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const iconUrl = 'http://localhost:3000/api/media/file/icon.svg'
const darkIconUrl = 'http://localhost:3000/api/media/file/icon-dark.svg'
const openGraphImageUrl = 'http://localhost:3000/api/media/file/og-image.png'

export default buildConfig({
  /* onInit: async (payload) => {
    await seedTags(payload)
  }, */

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/graphics/Logo/index.tsx#Logos',
        Icon: '/graphics/Icon/index.tsx#Icons',
      },
    },
    meta: {
      icons: [
        {
          fetchPriority: 'high',
          sizes: '32x32',
          type: 'image/svg',
          rel: 'icon',
          url: iconUrl || PayloadIcon,
        },
        {
          fetchPriority: 'high',
          sizes: '32x32',
          type: 'image/svg',
          rel: 'icon',
          url: darkIconUrl || PayloadIcon,
          media: '(prefers-color-scheme: dark)',
        },
      ],
      title: 'Dashboard',
      titleSuffix: '- Faszination Hund',
      description: 'Hunderassen, News und Tiervermittlung',
      applicationName: 'Faszination Hund',
      openGraph: {
        title: 'Dashboard',
        description: 'Hunderassen, News und Tiervermittlung',
        images: [
          {
            url: openGraphImageUrl || PayloadIcon,
          },
        ],
      },
    },
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    Dogs,
    Dogbreeds,
    Pages,
    Posts,
    CoatColors,
    CoatTypes,
    Tags,
    Countries,
    Roles,
    FciGroups,
    FciSections,
  ],
  globals: [Settings],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
    seoPlugin({
      collections: ['dogbreeds', 'dogs', 'pages'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} | Faszination Hund`,
      generateDescription: ({ doc }) => doc.descriptions.general,
    }),
  ],
  i18n: {
    supportedLanguages: { en, de },
  },
})
