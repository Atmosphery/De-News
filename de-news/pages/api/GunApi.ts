import { IGunInstance, IGunUserInstance } from "gun";
import Gun from 'gun'
import 'gun/sea';
import { NextApiRequest, NextApiResponse } from "next";
import { CgFormatUnderline } from "react-icons/cg";
import { IArticle } from "../objects";
import { useEffect } from 'react';
import { Http2SecureServer } from "http2";



let gun: IGunInstance;

let user: IGunUserInstance

export const initializeGun = () => {
    gun = Gun(process.env.db_dev)
    user = gun.user();
    user.recall({ sessionStorage: true })
}






export const logout = () => {
    user.recall({ sessionStorage: true });
    user.leave();
}


export default function GetGun(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        if (gun === undefined) {
            gun = Gun(process.env.db_dev);
        }
        res.json(JSON.stringify(gun));
    }
}





