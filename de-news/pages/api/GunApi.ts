import { IGunInstance, IGunUserInstance } from "gun";
import Gun from 'gun'
import { NextApiRequest, NextApiResponse } from "next";
import { CgFormatUnderline } from "react-icons/cg";
import { IArticle } from "../objects";
import { useEffect } from 'react';


let gun: IGunInstance;

let user: IGunUserInstance;






const confirmLoggedIn = () => {
    let userSession: any;

    useEffect(() => {
        userSession = window.sessionStorage.getItem('pair');
    }, [])

    user.auth(userSession.pub.value, (ack: any) => {
        console.log(ack);
    });

    if (user.is) {
        console.log('You are logged in');
    } else {
        console.log('You are not logged in');
    }
}

export  function getGun(): IGunInstance {

    if (gun === undefined) {
        gun = Gun(process.env.db_dev);
    }
    if(user === undefined) {
        user = gun.user().recall({sessionStorage: true});
    }

    return gun;

}



