import { Component, Dispatch, ReactNode, useContext } from 'react'
import Gun from 'gun';
//import Gun from 'gun'
import 'gun/sea';

import { IGunInstance, IGunUserInstance } from 'gun/types'

import AppBar from '../components/appBar';

import GetGun from './api/GunApi';
import { AppProps } from 'next/app';
import { IGlobalState } from './objects';







//const gun: IGunInstance = Gun('localhost:8765')
//{gun, user, setUser}: IProps
const Index = ({ gun, user, loggedIn, setLoggedIn}: IGlobalState) => {

  const checkLoginHandler = () => {
    if (user.is) {
      console.log("You are logged in")

    } else {
      console.log("You are not logged in")
    }
    console.log(user)

  }


  ////This is where you left off, you were chaniging index to a function and gonna try and call gun through an api
  return (
    <main>
      <AppBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <div className="flex">

        <h2 className='text-3xl font-bold underline'>Today's News</h2>
        <h2 className=''>Journalist of the day</h2>
        <button className='btn' onClick={checkLoginHandler}>Check</button>
      </div>

    </main>
  );
}








export default Index;

