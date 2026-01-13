import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { DogIcon } from 'lucide-react'

export const Logos = async () => {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'settings' })
  const lightModeLogo = settings.lightModeLogo as Media
  const darkModeLogo = settings.darkModeLogo as Media

  return (
    <>
      {lightModeLogo?.url ? (
        <Image
          src={lightModeLogo.url || ''}
          alt={lightModeLogo.alt}
          width={lightModeLogo.width || 640}
          height={lightModeLogo.height || 360}
          className="block dark:hidden p-8"
        />
      ) : (
        <DogIcon className="block dark:hidden p-8" />
      )}

      {darkModeLogo?.url ? (
        <Image
          src={darkModeLogo.url || ''}
          alt={darkModeLogo.alt}
          width={darkModeLogo.width || 640}
          height={darkModeLogo.height || 360}
          className="hidden dark:block p-8"
        />
      ) : (
        <DogIcon className="block dark:hidden p-8" />
      )}
    </>
  )
}
