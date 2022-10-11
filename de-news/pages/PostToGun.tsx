import exp from 'constants';
import Gun, { GunDataNode, IGun } from 'gun';
import React, { Component } from 'react';


export class PostToGun extends Component {
    gun: any
    constructor(props: any) {
        super(props); {
            this.gun = Gun('localhost:8765');
            this.state = {value: ''}
            //To have access to gun object in browser console
        }
    }

    getTodo = () => {
        const alice: any = this.gun.chain.get('Todos')
        
    }

    render() {

        return (
            <div>
                <h1>Todos</h1>

                <ul></ul>

                <form><input /><button>Add</button></form>
            </div>
        );
    }
}

export default PostToGun;