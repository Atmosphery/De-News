import { Component } from 'react'
import Gun from 'gun/gun'
import { IGunInstance, IGunUserInstance } from 'gun/types'
require('gun/sea');
import Home from './Home';
import AppBar from './appBar';



const gun: IGunInstance = Gun('233.255.255.255:8765');


export class Index extends Component {
  user: IGunUserInstance;
  constructor(props: any) {
    super(props); {
      this.user = gun.user();
    }
  }


  //Where you do inital loading
  async componentDidMount() {
    
  }

  render() {
    return (
      <main>
        <AppBar barTitle='Menu' />
        <div className='m-10 flex justify-center'>
          <Home />
        </div>

      </main>

    );
  }
}


export default Index;

