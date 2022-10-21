import { Component } from 'react'
import Gun from 'gun';
import { IGunInstance, IGunUserInstance } from 'gun/types'
require('gun/sea');
import Home from './Home';
import AppBar from './components/appBar';

//import { getGun } from './api/GunApi';




const gun: IGunInstance = Gun(process.env.db_dev)


export class Index extends Component {


  user: IGunUserInstance;
  constructor(props: any) {
    super(props); {
      this.user = gun.user();
    }
  }

  checkLogin = () => {

    if (this.user.is) {
      console.log('You are logged in');
    } else {
      console.log('You are not logged in');
    }
  }
  //Where you do inital loading
  async componentDidMount() {
    this.user.recall({sessionStorage: true});
  }

  render() {
    return (
      <main>

        <AppBar title='Home' />
        <div className='m-10 flex justify-start'>
          <Home />
          <button className='btn' onClick={this.checkLogin}>Check</button>
        </div>

      </main>

    );
  }
}


export default Index;

