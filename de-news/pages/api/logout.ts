import type { NextApiRequest, NextApiResponse } from 'next'
import { Router, useRouter } from 'next/router';
import Gun from 'gun';
import { logout } from './GunApi';



type Data = {
    message: string
}



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    if (req.method === 'POST') {
        const user = req.body.user
        console.log(req.body)
        user.recall({ sessionStorage: true })
        user.leave();
        
        console.log('logged out')
        res.redirect('/')
    }


    
    

}