/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.scss'
import '@/styles/payloadStyles.css'
import AdminSeedButton from '@/components/AdminSeedButton'
import { useAuth } from '@payloadcms/ui'

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

const Layout = ({ children }: Args) => {
  const { user } = useAuth()

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
      {typeof window !== 'undefined' && user && <AdminSeedButton />}
    </RootLayout>
  )
}

export default Layout
