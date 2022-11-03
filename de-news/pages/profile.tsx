import { profile } from "console";
import Gun, { IGunInstance, IGunUserInstance, _GunRoot } from "gun"
import 'gun/sea';
import { List } from "lodash";
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react";
import { HiUserGroup } from "react-icons/hi";
import { gunzip } from "zlib";
import AppBar from "../components/appBar";
import Article from "./Article";
import { IArticle, IGlobalState } from "./objects"

interface IProfile {
    username?: string,
    articles: Array<IArticle>
}

const Profile = ({ gun, user, loggedIn, setLoggedIn }: IGlobalState) => {


    const router = useRouter();
    let profile: IProfile = { username: '', articles: [] }
    var [reactArticles, setReactArticles] = useState(new Array<ReactNode>());

    //console.log(user.is?.pub)
    //
    gun.get('articles').map().once((article) => {
        //console.log(article)
        if (article.id === user.is?.pub) {
            profile.articles.push(article);
        }
    });

    

    


    const checkProfile = () => {
        console.log(profile)
        //console.log(getArticles())
    }


    // Once the user request finishes, show the user
    return (
        <main>
            <AppBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <h1>Your Profile</h1>
            <button onClick={checkProfile} className={'btn'}>check</button>
            <div id="articles">
                {reactArticles}
            </div>
        </main>
    )
}

export default Profile

export async function getServerSideProps({gun, user}: IGlobalState) {
    
    let profile: IProfile = { username: '', articles: [] }

    gun.get('articles').map().once((article) => {
        //console.log(article)
        if (article.id === user.is?.pub) {
            profile.articles.push(article);
        }
    });

    const temp = [];
        for (let i = 0; i < profile.articles.length; i++) {
            
            const article = profile.articles[i];
            temp.push(
                <Article
                    author={article.author}
                    date={article.date}
                    id={article.id}
                    text={article.text}
                    title={article.title}
                    key={i} />);
        }

    return {
        props:{

        }

    }
}

// if (!user.is) {


//     router.push('/login');
// } else {

//     let temp = new Array<ReactNode>
//     user.get('articles').map().once((data) => {
//         profile.articles.push(data);
//     });

//     for (let i = 0; i < profile.articles.length; i++) {
//         const article = profile.articles[i];
//         temp.push(<Article key={i} title={article.title} author={article.author} date={article.date} id={article.id} text={article.text} />)
//     }

//     setReactArticles(temp);
// }