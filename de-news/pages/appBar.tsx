import { IGun, IGunInstance } from 'gun';
import React, { Component } from 'react';

class AppBar extends React.Component {
    render() {
        return (
            <div className='flex'>
                <h1 className='text-3xl font-bold underline justify-content center'>De-News!</h1>
                <form action='/api/hello'>
                    <input />
                </form>
            </div>
        );
    }
}


export default AppBar;

