import { _GunRoot } from "gun"
import 'gun/sea';
import { useRouter } from "next/router"
import { useState } from "react";
import Article from "../../components/NormalArticle";
import _, { set } from 'lodash'
import { useEffect } from "react";
import React from "react";
require('gun/lib/unset.js')
require('gun/lib/path.js')


const ProfileView = ({ gun }) => {

    const router = useRouter();
    let pub;


    const articles = []
    const [reactArticles, setReactArticles] = useState([]);
    const [username, setUsername] = useState();
    //

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
        if (router && router.query) {
            console.log(router.query.pub);
            pub = router.query.pub;
            gun.user(router.query.pub).get('alias').once(async (a) => {
                console.log(a);
                await setUsername(a);

            });
            const existingArticles = [];

            (async function () {
                await gun.get('articles').map(article => article !== null ? article : undefined).on((article, id) => {
                    

                    const doesExist = checkExising(existingArticles, id);

                    if (article !== null && article.user === router.query.pub && !doesExist) {
                        existingArticles.push(id);
                        article.id = id;
                        console.log(article, id);
                        articles.push(article);

                    }
                });


                console.log(articles.length, 'article state');
                const rArticles = profileInit();
                console.log(rArticles.length, 'rArticles')
                setReactArticles(rArticles);


            })
                ();

        }




    }, [router]);




    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {

            // Generate random number
            var j = Math.floor(Math.random() * (i + 1));

            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    const profileInit = () => {

        var tempArticles = [];
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            //console.log(article.text)
            tempArticles.push(
                <Article
                    author={article.author}
                    thumbnail={article.thumbnail}
                    date={article.date}
                    user={article.user}
                    id={_.get(article, "_.#", undefined)}
                    text={article.text}
                    title={article.title}
                    key={i}
                />
            );
        }
        tempArticles = shuffleArray(tempArticles);
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


