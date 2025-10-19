import { NextRequest, NextResponse } from 'next/server'
import payload from 'payload'
import config from '@/payload.config'
import { runSeed } from '@/seeds/seed'

export async function POST(req: NextRequest) {
  try {
    // Payload init, falls nötig
    await payload.init({ config })

    // Optional: Admin-Check über Request-Body
    const body = await req.json()
    const userEmail = body.email
    const user = await payload.find({
      collection: 'users',
      where: {
        email: { equals: userEmail },
        role: { equals: 'admin' },
      },
      limit: 1,
    })

    if (user.totalDocs === 0) {
      return NextResponse.json(
        { error: 'Forbidden: Only admins can run the seed' },
        { status: 403 },
      )
    }

    console.log(`🌱 Admin ${userEmail} running seed...`)
    await runSeed()

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
