// src/app/(payload)/api/seed/route.ts

import { NextResponse } from 'next/server'
import { runSeed } from '@/seeds/seed'
import payload from 'payload'
import config from '@/payload.config'

let payloadInitialized = false

export async function POST() {
  try {
    console.log('🌱 Running seed...')

    if (!payloadInitialized) {
      await payload.init({ config })
      payloadInitialized = true
    }

    await runSeed()
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Seed failed:', err)
    return NextResponse.json({ error: 'Seed failed', details: err }, { status: 500 })
  }
}
