import { _GunRoot } from "gun"
import 'gun/sea';
import { useRouter } from "next/router"
import { useState } from "react";
import AppBar from "../components/appBar";
import Article from "../components/Article";
import Gun from 'gun'
import _ from 'lodash'
import { useEffect } from "react";
require('gun/lib/unset.js')
require('gun/lib/path.js')


const Profile = (props) => {

    const router = useRouter();


    if (!props.user.is) {
        
        router.push('/login');
    }


    const [articles, setArticles] = useState(props.profile.articles);

    console.log(props.user);

    const [reactArticles, setReactArticles] = useState([]);

    useEffect(() => {
        const rArticles = profileInit();
        setReactArticles(rArticles);
        const username = sessionStorage.getItem('currentUsername');
        props.profile.username = username;
    }, [articles])


    

    const profileInit = () => {
        const tempArticles = [];
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            //console.log(article.text)
            tempArticles.push(
                <Article
                    setArticles={setArticles}
                    articles={articles}
                    author={article.author}
                    date={article.date}
                    user={props.user.is.pub}
                    id={_.get(article, "_.#", undefined)}
                    text={article.text}
                    title={article.title}
                    gun={props.gun.get('articles')}
                    key={i}
                />
            );
        }
        return tempArticles;
    }




    return (
        <main>
            <AppBar user={props.user} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
            <div className="flex flex-col items-center">
                <h1 className="text-5xl">{props.profile.username}'s Profile</h1>
                <div id="articles" className="mt-5 flex flex-col items-center">
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

    const user = gun.user()
    user.recall({ sessionStorage: true })

    const pub = user.is?.pub;

    const gunArticles = gun.get('deNewsDb/articles');


    await gunArticles.map(article => article !== null ? article: undefined).once((article, id) => {
        console.log(article)
        if (article.user === pub) {
            
            article.id = id;
            console.log(article, id);
            profile.articles.push(article);
        }
    });


    return { profile: profile }
}

export default Profile


