import { notFound } from 'next/navigation'

import { getPageBySlug } from '@/utils/getPageBySlug'

import { RenderBlocks } from '@/blocks'

export default async function HomePage() {
  const page = await getPageBySlug('home')

  if (!page) notFound()

  return <RenderBlocks blocks={page.content} />
}
