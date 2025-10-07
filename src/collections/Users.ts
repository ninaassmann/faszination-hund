import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Benutzer',
    plural: 'Benutzer',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Allgemein',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
