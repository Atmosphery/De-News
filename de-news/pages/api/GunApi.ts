import { IGunInstance, IGunUserInstance } from "gun";
import Gun from 'gun'
import { NextApiRequest, NextApiResponse } from "next";
import { CgFormatUnderline } from "react-icons/cg";
import { IArticle } from "../objects";
import { useEffect } from 'react';


let gun: IGunInstance;


export const checkLogin = (user: IGunUserInstance): boolean => {
    //let user = gun.user();
    if (user.is) {
        console.log('You are logged in');
        return true
    }else{
        console.log('You are not logged in');
        return false
    }
    
}



export const logout = (user: IGunUserInstance) => {
    user.recall({ sessionStorage: true });
    user.leave();
}


export function getGun(): IGunInstance {
    if(gun === undefined){
        gun = Gun(process.env.db_dev);
    }
    return gun;
}





