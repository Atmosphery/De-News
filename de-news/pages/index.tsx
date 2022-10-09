import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import GUN from 'gun/gun'
const qs = require('querystring')

const gun = GUN({
  peers: ['http://localhost:8765/'] // Put the relay node that you want here
});

export default class Index extends React.Component {
  constructor (props: any) {
    super(props)
    this.state = {
      number: 0
    }
    this.handleAddOne = this.handleAddOne.bind(this)
    this.handleSubtractOne = this.handleSubtractOne.bind(this)
  } 
}

handleAddOne(){
  const board 
}


const Home: NextPage = () => {
  
  
  return (
    
    <div className={styles.container}>
      <form>
        <input>
        <button>Add</button>
        </input>
      </form>

      <ul></ul>
    </div>
  )
}

export default Home
