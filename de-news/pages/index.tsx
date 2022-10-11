import type { GetServerSideProps,NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Component } from 'react'
import Gun, { IGun } from 'gun'
import {useRouter} from 'next/router';
import Home from './Home';
import AppBar from './appBar';
import PostToGun from './PostToGun';


const getPath = () => {
  const router = useRouter()
  return router.pathname;
}

export class Index extends Component {
    gun: any
    constructor(props: any) {
    super(props); { 
      this.gun=Gun('localhost:8765');
      
       //To have access to gun object in browser console
    }
  }
  
  
  render() {
    return (
      <div>
      <AppBar />
      <Home gun={this.gun} />
      <PostToGun  />

      </div>
      
    );
  }
}


export default Index;

