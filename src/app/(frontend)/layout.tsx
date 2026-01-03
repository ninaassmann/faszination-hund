import './styles.css'

import { Faustina } from 'next/font/google'
import { Header } from '@/components/frontend/Header'

export const metadata = {
  description: 'Infos, News und Vermittlung.',
  title: 'Faszination Hund',
}

const serif = Faustina({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: '400',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${serif.variable}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
