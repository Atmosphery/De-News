import { IGun, IGunInstance } from 'gun';
import React, { Component } from 'react';

interface IHome {
  gun: IGunInstance<any>
}

function Home(props: {gun: IGun}) {

  return (
    <div>
      <h1>{'De-News!'}</h1>
    </div>
    );
};

export default Home;