// pages/api/seed.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import payload from 'payload'
import config from '@/payload.config'
import { runSeed } from '@/seeds/seed'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Payload init nur, falls nötig (runSeed macht das sowieso)
  await payload.init({ config })

  // Admin-Check (hier Beispiel: über session/email)
  const userEmail = req.body.email
  const user = await payload.find({
    collection: 'users',
    where: {
      email: { equals: userEmail },
      role: { equals: 'admin' },
    },
    limit: 1,
  })

  if (user.totalDocs === 0) {
    return res.status(403).json({ error: 'Forbidden: Only admins can run the seed' })
  }

  try {
    console.log(`🌱 Admin ${userEmail} running seed...`)
    await runSeed()
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Seed failed' })
  }
}
