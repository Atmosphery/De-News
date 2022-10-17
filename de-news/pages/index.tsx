import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Component } from 'react'
import Gun, { GunNodePut, IGun, IGunInstance } from 'gun'
import { useRouter } from 'next/router';
import Home from './Home';
import AppBar from './appBar';
import PostToGun from './PostToGun';




export class Index extends Component {
  gun: IGunInstance
  constructor(props: any) {
    super(props); {
      this.gun = Gun('233.255.255.255:8765');
      
      //window.Gun = this.gun;
    }
  }


  //Where you do inital loading
  async componentDidMount() {
    this.gun.get('test').get('testdata').put({title: 'this is a title', author:'Mr.Gibbins'});
    this.gun.get('test').get('testdata').on((data:any, key:any) =>{
      console.log(data, key);
    })
  }




  render() {
    return (
      <div className='m-10'>
        <AppBar />
        <Home gun={this.gun} />
        <PostToGun gun={this.gun} />

      </div>

    );
  }
}


export default Index;

