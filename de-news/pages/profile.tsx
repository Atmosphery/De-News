import { IGunInstance, IGunUserInstance, _GunRoot } from "gun"
import 'gun/sea';
import { List } from "lodash";
import Router, { useRouter } from "next/router"
import { ReactNode, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import AppBar from "../components/appBar";
import Article from "./Article";
import { IArticle, IGlobalState } from "./objects"

interface IProfile {
    username?: string,
    articles: Array<IArticle>
}

const Profile = ({ user, loggedIn, setLoggedIn }: IGlobalState) => {
    const router = useRouter();



    let profile: IProfile = { username: '', articles: [] }
    var [reactArticles, setReactArticles] = useState(new Array<ReactNode>);
    //var reactArticles = new Array<ReactNode>



    const checkProfile = () => {
        console.log(profile)
    }

    let temp = new Array<ReactNode>
    user.get('articles').map().once((data) => {
        profile.articles.push(data);
    });

    for (let i = 0; i < profile.articles.length; i++) {
        const article = profile.articles[i];
        temp.push(<Article title={article.title} author={article.author} date={article.date} id={article.id} text={article.text} />)
    }


    
    //reactArticles = getArticles();

    // Server-render loading state
    if (!user.is) {
        router.push('/login');
    } else {
        setReactArticles(temp);
    }

    console.log(reactArticles)
    // Once the user request finishes, show the user
    return (
        <main>
            <AppBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <h1>Your Profile</h1>
            <button onClick={checkProfile} className={'btn'}>check</button>
            <div id="articles">{reactArticles.map(article => <div>{article}</div>)}</div>
        </main>
    )
}

export default Profile