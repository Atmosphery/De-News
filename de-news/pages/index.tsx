import { Component } from 'react'
import Gun from 'gun/gun'
import { IGunInstance, IGunUserInstance } from 'gun/types'
require('gun/sea');
import Home from './Home';
import AppBar from './appBar';



const gun: IGunInstance = Gun('localhost:8765');


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
    
  }

  render() {
    return (
      <main>
        
        <AppBar title='Home'/>
        <div className='m-10 flex justify-start'>
          <Home />
          <button className='btn' onClick={this.checkLogin}>Check</button>
        </div>

      </main>

    );
  }
}


export default Index;

