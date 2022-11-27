import '../styles/globals.css'
import { useEffect, useState } from 'react'
import Gun from 'gun';
import { initializeGun } from './api/GunApi' // this import keeps user from being undefined even though it is not being used????
import 'react-quill/dist/quill.snow.css'
import Layout from '../components/Layout';




function MyApp({ Component, pageProps }) {

  let gun = Gun({peers: ['https://gun-us.herokuapp.com/gun']});

  let user = gun.user();

  gun = gun.get('deNewsDb');

  user.recall({ sessionStorage: true })
  let [loggedIn, setLoggedIn] = useState(false);


  

  

  return (
    <Layout gun={gun} user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn}>
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
