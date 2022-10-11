import Gun, { GunDataNode, IGun } from 'gun';
import React, { Component } from 'react';

function PostToGun (gun: IGun) {
    const alice:any = gun.chain.get('NewsArticles').put({id: 0, article: 'Ukraine got bombed again', date: '10/19/2022'})
    alice.on()

    return (
        <div></div>
    );
}