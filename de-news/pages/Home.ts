import { IGun, IGunInstance } from 'gun';
import React, { Component } from 'react';

interface IHome {
  gun: IGunInstance<any>
}

const Home = (param1: IGun) =>{

  return (
    `<div>
      <h1>Home Component</h1>
    </div>`
    );
};

export default Home;