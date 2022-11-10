import '../styles/globals.css'
import { useEffect, useState } from 'react'
import Gun, { IGunInstance, IGunUserInstance } from 'gun';
import { initializeGun } from './api/GunApi'
import 'react-quill/dist/quill.snow.css'



function MyApp({ Component, pageProps }) {

  

  let gun = Gun('localhost:8765/gun')

  let user = gun.user()

  gun = gun.get('deNewsDb');

  user.recall({ sessionStorage: true })
  let [loggedIn, setLoggedIn] = useState(false);


  return (
      <Component
        {...pageProps}
        gun={gun}
        user={user}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
  )

}

export default MyApp