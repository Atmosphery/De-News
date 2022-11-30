import { _GunRoot } from "gun"
import 'gun/sea';
import { useRouter } from "next/router"
import { useState } from "react";
import Article from "../../components/NormalArticle";
import _ from 'lodash'
import { useEffect } from "react";
import React from "react";
require('gun/lib/unset.js')
require('gun/lib/path.js')


const ProfileView = (props) => {

    const router = useRouter();
    var [pub, setPub] = useState();

    useEffect(() => {
        if (router && router.query) {
            console.log(router.query);
            setPub(router.query.pub);
        }

        props.gun.user(router.query.pub).get('alias').on((a) => {
            console.log(a);
            setUsername(a);
        });
    }, [router]);

    let profile = { username: '', articles: [] };
    const [username, setUsername] = useState();
    const [articles, setArticles] = useState(profile.articles);
    const [reactArticles, setReactArticles] = useState([]);

    
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
            const existingArticles = []
            await props.gun.get('articles').map(article => article !== null ? article : undefined).on((article, id) => {
                const doesExist = checkExising(existingArticles, id);

                if (article !== null && article.user === pub && !doesExist) {
                    existingArticles.push(id);
                    article.id = id;
                    console.log(article, id);
                    profile.articles.push(article);
                }
            });


            console.log(articles.length, 'article state');
            const rArticles = profileInit();
            console.log(rArticles.length, 'rArticles')
            setReactArticles(rArticles);

        })
            ();



    }, [articles, pub])


    const profileInit = () => {

        const tempArticles = [];
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            tempArticles.push(
                <Article
                    author={article.author}
                    date={article.date}
                    user={article.user}
                    id={_.get(article, "_.#", undefined)}
                    text={article.text}
                    title={article.title}
                    key={i}
                />
            );
        }
        return tempArticles;
    }


    //console.log(articles.length, 'rendering');
    // console.log(articles)
    return (
        <main>
            <div className="flex flex-col items-center">
                <h1 className="text-5xl">{username}'s Profile</h1>
                <div id="articles" className="mt-5 flex flex-col items-center">
                    <h2><strong>Articles:</strong></h2>
                    {reactArticles}
                </div>
            </div>

        </main>
    )
}


export default ProfileView


