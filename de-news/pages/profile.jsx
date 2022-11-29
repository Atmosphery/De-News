import { _GunRoot } from "gun"
import 'gun/sea';
import { useRouter } from "next/router"
import { useState } from "react";
import ProfileArticle from "../components/ProfileArticle";
import _ from 'lodash'
import { useEffect } from "react";
import React from "react";
require('gun/lib/unset.js')
require('gun/lib/path.js')


const Profile = (props) => {

    const router = useRouter();

    useEffect(() => {
        if (router && router.query) {
            console.log(router.query);
            if (!props.user.is) {

                router.push('/login');
            }
        }
    }, [router]);

    let profile = { username: '', articles: [] };
    const [username, setUsername] = useState();
    const [articles, setArticles] = useState(profile.articles);
    const [reactArticles, setReactArticles] = useState([]);
    
    useEffect(() => {
        if (window) {
            setUsername(sessionStorage.getItem('currentUsername'));
        }
    }, []);

    const checkExising = (existingArticles, id) => {

        //debugger
        for (let i = 0; i < existingArticles.length; i++) {
            const article = existingArticles[i];
            if (article === id) {
                return true;
            }
        }
        return false;
    }



    useEffect(() => {
        (async function () {
            console.log(articles);
            const existingArticles = []
            await props.gun.get('articles').map(article => article !== null ? article : undefined).on((article, id) => {
                const doesExist = checkExising(existingArticles, id);

                if (article !== null && article.user === pub && !doesExist) {
                    existingArticles.push(id);
                    article.id = id;
                    profile.articles.push(article);
                }
            });


            console.log(articles.length, 'article state');
            let reacifyArticles = articles.map((article, i) =>
                <ProfileArticle
                    setArticles={setArticles}
                    articles={articles}
                    author={article.author}
                    date={article.date}
                    user={props.user.is.pub}
                    id={_.get(article, "_.#", undefined)}
                    text={article.text}
                    title={article.title}
                    gun={props.gun.get('articles')}
                    key={_.get(article, "_.#", undefined)}
                />)
            
            setReactArticles(reacifyArticles);
            //setReactArticles(reacifyArticles);
            console.log(reactArticles);

        })
            ();



    }, [articles])

    const pub = props.user.is?.pub;




    //console.log(articles.length, 'rendering');
    // console.log(articles)
    return (
        <main>
            <div className="flex flex-col items-center">
                <h1 className="text-5xl">{username}'s Profile</h1>
                <div id="articles" className="mt-5 flex flex-col items-center">
                    <h2><strong>Your Articles</strong></h2>
                    {reactArticles}
                </div>
            </div>

        </main>
    )
}


export default Profile


