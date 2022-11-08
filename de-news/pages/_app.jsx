import '../styles/globals.css'
import { useEffect, useState } from 'react'
import Gun, { IGunInstance, IGunUserInstance } from 'gun';
import { initializeGun } from './api/GunApi'
import Layout from '../components/layout';
import 'react-quill/dist/quill.snow.css'



function MyApp({ Component, pageProps }) {

  

  let gun = Gun('localhost:3000/gun')

  let user = gun.user()

  

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
