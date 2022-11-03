import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Gun, { IGunInstance, IGunUserInstance } from 'gun';
import { initializeGun } from './api/GunApi'
import Layout from '../components/layout';



function MyApp({ Component, pageProps }: AppProps) {

  

  let gun: IGunInstance = Gun('localhost:8765/gun')
  console.log('localhost:8765/gun')

  let user: IGunUserInstance = gun.user()

  

  user.recall({ sessionStorage: true })
  let [loggedIn, setLoggedIn] = useState(false);


  return (
    <Layout user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
      <Component
        {...pageProps}
        gun={gun}
        user={user}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
    </Layout>
  )

}

export default MyApp
