// src/components/AminSeedButton.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@payloadcms/ui'

export default function AdminSeedButton() {
  const { user } = useAuth() // Client-side auth hook
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  if (!user) return null // Button nur anzeigen, wenn eingeloggt

  const runSeed = async () => {
    setLoading(true)
    setMessage('Seeding…')

    try {
      const res = await fetch('/api/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) throw new Error('Seed failed')

      setMessage('✅ Seed complete!')
    } catch (err) {
      setMessage('❌ Error running seed')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="absolute bottom-8 right-8">
      <button
        onClick={runSeed}
        disabled={loading}
        className="px-6 py-4 bg-blue-900 border-1 border-blue-200/50 rounded-sm"
      >
        {loading ? 'Running...' : 'Run Seed'}
      </button>
      <p>{message}</p>
    </div>
  )
}
