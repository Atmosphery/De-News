import Gun from 'gun'
import 'gun/sea';



let gun

let user

export const initializeGun = () => {
    gun = Gun(process.env.db_dev)
    user = gun.user();
    user.recall({ sessionStorage: true })
}






export const logout = () => {
    user.recall({ sessionStorage: true });
    user.leave();
}


export default function GetGun(req, res) {
    if (req.method === 'GET') {
        if (gun === undefined) {
            gun = Gun(process.env.db);
        }
        res.json(JSON.stringify(gun));
    }
}





