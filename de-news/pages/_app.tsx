import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Gun, { IGunInstance, IGunUserInstance } from 'gun';
import { initializeGun } from './api/GunApi'
import Layout from './components/layout';



function MyApp({ Component, pageProps }: AppProps) {
  const gun: IGunInstance = Gun(process.env.db_dev);
  const user: IGunUserInstance = gun.user()
  user.recall({ sessionStorage: true })
  let [loggedIn, setLoggedIn] = useState(false);


  return (
    <Layout user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
      <Component
        {...pageProps}
        gun={gun}
        user={user}
      />
    </Layout>
  )

}

export default MyApp
