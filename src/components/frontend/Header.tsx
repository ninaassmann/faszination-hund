import { Menu } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="container py-4 flex justify-between items-center">
      <Link href="/">
        <span className="font-serif text-2xl text-primary">Faszination Hund</span>
      </Link>
      <nav className="hidden sm:flex gap-10 h-10 items-center">
        <Link href="/hunderassen">Hunderassen</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/admin" rel="noopener noreferrer" target="_blank">
          Login
        </Link>
      </nav>
      <div className="inline-block sm:hidden dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-square btn-ghost">
          <Menu />
        </button>
        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-base-100 rounded z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <Link href="/hunderassen">Hunderassen</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/admin" rel="noopener noreferrer" target="_blank">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
