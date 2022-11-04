import { _GunRoot } from "gun"
import 'gun/sea';
import { useRouter } from "next/router"
import { useState } from "react";
import AppBar from "../components/appBar";
import Article from "./Article";
import Gun from 'gun'



const Profile = (props) => {


    const router = useRouter();
    const articles = props.profile.articles

    const reactArticles = [];
    for (let i = 0; i < articles.length; i++) {

        const article = props.profile.articles[i];
        reactArticles.push(

            <Article
                author={article.author}
                date={article.date}
                id={article.id}
                text={article.text}
                title={article.title}
                key={i}
            />

        )


    }


    

    console.log(props.reactArticles)




    const checkProfile = () => {
        console.log(props.profile)
        //console.log(getArticles())
    }

    // Once the user request finishes, show the user
    return (
        <main>
            <AppBar user={props.user} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
            <div className="m-5">
                <h1>Your Profile</h1>
                <button onClick={checkProfile} className={'btn'}>check</button>
                <div id="articles" className="mt-5">
                    <strong>Your Articles</strong>
                    {reactArticles}
                </div>
            </div>

        </main>
    )
}

Profile.getInitialProps = async () => {

    let profile = { username: '', articles: [] }
    const gun = Gun('localhost:8765/gun');
    //console.log(gun);

    const user = gun.user()
    user.recall({ sessionStorage: true })

    await gun.get('articles').map().once((article) => {

        if (article.id === user.is?.pub) {
            console.log(article);
            profile.articles.push(article);
        }
    });



    return { profile: profile }
}

export default Profile


