import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { en } from '@payloadcms/translations/languages/en'
import { de } from '@payloadcms/translations/languages/de'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { fciGroups } from './collections/fciGroups'
import { fciSections } from './collections/fciSections'
import { dogbreeds } from './collections/dogbreeds'
import { tags } from './collections/tags'
import { coatColors } from './collections/coatColors'
import { coatTypes } from './collections/coatTypes'
import { countries } from './collections/countries'
import { roles } from './collections/roles'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  /* onInit: async (payload) => {
    await seedRoles(payload)
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
    dogbreeds,
    coatColors,
    coatTypes,
    tags,
    countries,
    roles,
    fciGroups,
    fciSections,
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
  ],
  i18n: {
    supportedLanguages: { en, de },
  },
})
