import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { IGunInstance } from 'gun';


function MyApp({ Component, pageProps }: AppProps) {
  const [gun, setGun] = useState(Gun(process.env.db_dev));
  const [user, setUser] = useState(gun.user());
  user.recall({sessionStorage: true})
  

  return (
    <Component 
      {...pageProps}
      gun = {gun}
      user = {user}
      setUser = {setUser}
    />
  )

}

export default MyApp
