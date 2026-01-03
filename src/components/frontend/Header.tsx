import config from '@/payload.config'
import Link from 'next/link'

export async function Header() {
  const payloadConfig = await config

  return (
    <header className="container py-4 flex justify-between items-center">
      <span className="font-serif text-2xl text-primary">Faszination Hund</span>
      <Link
        className="admin"
        href={payloadConfig.routes.admin}
        rel="noopener noreferrer"
        target="_blank"
      >
        Go to admin panel
      </Link>
    </header>
  )
}
