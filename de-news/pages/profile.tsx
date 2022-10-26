import { IGunInstance, IGunUserInstance, _GunRoot } from "gun"
import 'gun/sea';
import Router, { useRouter } from "next/router"
import { HiUserGroup } from "react-icons/hi";
import AppBar from "../components/appBar";
import { IGlobalState } from "./objects"

interface IProfile {
    username?: string,
    articles?: []
}

const Profile = ({gun, user, loggedIn, setLoggedIn}: IGlobalState) => {
    // Fetch the user client-side
    const router = useRouter();
    let publicKey: string = ''
    let userNode: _GunRoot;
    
    let profile:IProfile = {}
    // Server-render loading state
    if (gun.user().is) {
        publicKey = gun.user().is?.pub as string
        gun.user(publicKey).on("create", (_user) =>{
            console.log(_user)
        })
        
    }else{
        router.push('/login');
        
    }

    // Once the user request finishes, show the user
    return (
        <main>
            <AppBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
            <h1>Your Profile</h1>
            <pre></pre>
        </main>
    )
}

export default Profile