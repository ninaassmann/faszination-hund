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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  /* onInit: async (payload) => {
    await seedTags(payload)
  }, */

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Dogbreeds,
    CoatColors,
    CoatTypes,
    Tags,
    Countries,
    Roles,
    FciGroups,
    FciSections,
  ],
  editor: lexicalEditor(),
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
      collections: ['dogbreeds'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} | Faszination Hund`,
      generateDescription: ({ doc }) => doc.descriptions.general,
    }),
  ],
  i18n: {
    supportedLanguages: { en, de },
  },
})
