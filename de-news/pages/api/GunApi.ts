import { IGunInstance, IGunUserInstance } from "gun";
import Gun from 'gun'
import 'gun/sea';
import { NextApiRequest, NextApiResponse } from "next";
import { CgFormatUnderline } from "react-icons/cg";
import { IArticle } from "../objects";
import { useEffect } from 'react';


let gun: IGunInstance;

let user: IGunUserInstance

export const initializeGun = () => {
    gun = Gun(process.env.db_dev)
    user = gun.user();
    user.recall({sessionStorage: true})
}


export const checkLogin = (): boolean => {
    //let user = gun.user();
    if (user.is) {
        console.log('You are logged in');
        return true
    }else{
        console.log('You are not logged in');
        return false
    }
}



export const logout = () => {
    user.recall({ sessionStorage: true });
    user.leave();
}


export function getGun(): IGunInstance {
    if(gun === undefined){
        gun = Gun(process.env.db_dev);
    }
    return gun;
}





