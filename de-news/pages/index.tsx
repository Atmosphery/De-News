import { Component, Dispatch, ReactNode } from 'react'
import Gun from 'gun';
//import Gun from 'gun'
import 'gun/sea';

import { IGunInstance, IGunUserInstance } from 'gun/types'

import Home from './Home';
import AppBar from './components/appBar';
import { checkLogin } from './api/GunApi'

import { getGun } from './api/GunApi';
import { AppProps } from 'next/app';
import { IGlobalState } from './objects';






//const gun: IGunInstance = Gun('localhost:8765')
//{gun, user, setUser}: IProps
const Index = () => {



////This is where you left off, you were chaniging index to a function and gonna try and call gun through an api

  const checkLoginHandler = () => {
    if (this.props.user.is) {
      console.log("You are logged in")

    } else {
      console.log("You are not logged in")
    }
    console.log(this.props.user)

  }


  return (
    <main>
      <div className='m-10 flex justify-start'>
        <Home />
        <button className='btn' onClick={this.checkLoginHandler}>Check</button>
      </div>
    </main>
  );
}

Index.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}






export default Index;

