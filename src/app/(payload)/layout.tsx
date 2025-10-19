import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap.js'
import './custom.scss'
import '@/styles/payloadStyles.css'
import dynamic from 'next/dynamic'

const AdminSeedButton = dynamic(() => import('@/components/AdminSeedButton'), {
  ssr: false, // nur client-seitig rendern
})

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
    {/* Button wird jetzt nur im Browser gerendert */}
    <AdminSeedButton />
  </RootLayout>
)

export default Layout
