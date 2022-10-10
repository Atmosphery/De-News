import React from 'react'
import Gun from 'gun/gun'
import Home from './Home';


const gun = Gun('https://mvp-gun.herokuapp.com/gun')

class Index extends Component {
  constructor() {
  super();
    this.gun=Gun(location.origin+'/gun');
    window.gun = this.gun; //To have access to gun object in browser console
  }

  render() {
    return (
      <Home gun={this.gun} />
    );
  }
}