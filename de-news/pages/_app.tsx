import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Gun from 'gun';
import Layout from './components/layout';
import { initializeGun } from './api/GunApi'



function MyApp({ Component, pageProps }: AppProps) {
  initializeGun();

  return (
    <Layout>
      <Component
        {...pageProps}
      />
    </Layout>
  )

}

export default MyApp
