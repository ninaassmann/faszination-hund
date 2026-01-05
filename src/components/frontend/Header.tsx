import config from '@/payload.config'
import Link from 'next/link'

export async function Header() {
  const payloadConfig = await config

  return (
    <header className="container py-4 flex justify-between items-center">
      <Link href="/">
        <span className="font-serif text-2xl text-primary">Faszination Hund</span>
      </Link>
      <div className="flex gap-10">
        <Link href="/blog">Blog</Link>
        <Link href={payloadConfig.routes.admin} rel="noopener noreferrer" target="_blank">
          Login
        </Link>
      </div>
    </header>
  )
}
