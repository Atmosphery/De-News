import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Component } from 'react'
import Gun from 'gun/gun'
import { IGunInstance, IGunUserInstance } from 'gun/types'
require('gun/sea');
import Home from './Home';
import AppBar from './appBar';
import PostToGun from './PostToGun';



const gun:IGunInstance = Gun('233.255.255.255:8765');


export class Index extends Component {
  user:IGunUserInstance;  
  constructor(props: any) {
    super(props); {
      this.user = gun.user()
      //window.Gun = this.gun;
    }
  }


  //Where you do inital loading
  async componentDidMount() {
    //this.user = gun.user();
    //('alias', ''pass', 'callback', 'options')
    
    
    gun.get('test').get('testdata').put({title: 'this is a title', author:'Mr.Gibbins'});
    gun.get('test').get('testdata').on((data:any, key:any) =>{
      console.log(data, key);
    })
  }




  render() {
    return (
      <div className='m-10'>
        <AppBar />
        <Home />
        <PostToGun gun={gun} />

      </div>

    );
  }
}


export default Index;

