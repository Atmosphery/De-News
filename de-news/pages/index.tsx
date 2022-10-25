import { Component } from 'react'
import Gun from 'gun';
//import Gun from 'gun'
import 'gun/sea';

import { IGunInstance, IGunUserInstance } from 'gun/types'

import Home from './Home';
import AppBar from './components/appBar';
import { checkLogin } from './api/GunApi'

import { getGun } from './api/GunApi';





//const gun: IGunInstance = Gun('localhost:8765')

export const Index = () => {


  const gun: IGunInstance = Gun(process.env.db_dev)
  const user: IGunUserInstance = gun.user().recall({sessionStorage:true});
  
  



  //Where you do inital loading

  const checkLoginHandler = () => {
    console.log(user.is);
    
  
  }

  



  return (
    <main>

      <AppBar title='Home' user={user} />
      <div className='m-10 flex justify-start'>
        <Home />
        <button className='btn' onClick={checkLoginHandler}>Check</button>
      </div>

    </main>

  );

}


export default Index;

