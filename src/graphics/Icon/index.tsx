import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { DogIcon } from 'lucide-react'

export const Icons = async () => {
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'settings' })
  const lightModeIcon = settings.lightModeIcon as Media
  const darkModeIcon = settings.darkModeIcon as Media

  return (
    <>
      {lightModeIcon?.url ? (
        <Image
          src={lightModeIcon.url}
          alt={lightModeIcon.alt || 'Logo'}
          width={lightModeIcon.width || 64}
          height={lightModeIcon.height || 64}
          className="block dark:hidden"
        />
      ) : (
        <DogIcon className="block dark:hidden w-8 h-8" />
      )}

      {darkModeIcon?.url ? (
        <Image
          src={darkModeIcon.url}
          alt={darkModeIcon.alt || 'Logo'}
          width={darkModeIcon.width || 64}
          height={darkModeIcon.height || 64}
          className="hidden dark:block"
        />
      ) : (
        <DogIcon className="hidden dark:block w-8 h-8" />
      )}
    </>
  )
}
