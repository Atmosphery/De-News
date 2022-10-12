import exp from 'constants';
import Gun, { GunDataNode, IGun } from 'gun';
import React, { Component } from 'react';


const PostToGun = (props: { gun: IGun }) => {


    const getTodo = () => {
        const alice: any = props.gun.chain.get('Todos')

    }



    return (
        <div>
            <h1>Todos</h1>

            <ul></ul>

            <form><input /><button>Add</button></form>
        </div>
    );
}

export default PostToGun;