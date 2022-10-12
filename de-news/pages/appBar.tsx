import { IGun, IGunInstance } from 'gun';
import React, { Component } from 'react';

class AppBar extends React.Component {
    render() {
        return (
            <div>
                <h1>{'De-News!'}</h1>
                <form action='/api/hello'>
                    <input />
                </form>
            </div>
        );
    }
}


export default AppBar;

