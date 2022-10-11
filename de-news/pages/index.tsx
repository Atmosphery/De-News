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


export class Index extends Component {
    gun: any
  constructor(props: any) {
    super(props); { 
      this.gun=Gun('localhost:8765');
      //window.Gun = this.gun;
       //To have access to gun object in browser console
    }
  }

  async componentDidMount() {
    window.Gun = this.gun;
  }

  
  insertDB = () => {

  }

  render() {
    return (
      <div>
      <AppBar />
      <Home gun={this.gun} />
      

      </div>
      
    );
  }
}


export default Index;

