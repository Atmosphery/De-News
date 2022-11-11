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


    const [reactArticles, setReactArticles] = useState([]);

    useEffect(() => {
        const rArticles = profileInit();
        setReactArticles(rArticles);
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
            <div className="m-5">
                <h1>Your Profile</h1>
                <div id="articles" className="mt-5">
                    <strong>Your Articles</strong>
                    {reactArticles}

                </div>
            </div>

        </main>
    )
}

// export async function getServerSideProps() {
//     let profile = { username: '', articles: [] }
//     const gun = Gun('localhost:8765/gun');

//     const user = gun.user()
//     user.recall({ sessionStorage: true })

//     const pub = user.is?.pub;

//     const gunArticles = gun.get('deNewsDb/articles');


//     //article => article.user === pub && article !== null ? article : undefined

//     await gunArticles.map().on((article, id) => {


//         if (article !== null && article.user === pub) {

//             article.id = id;
//             console.log(article, id);
//             profile.articles.push(article);
//         }
//     });


//     return {
//         profile: profile
//     }
// }

Profile.getInitialProps = async () => {

    let profile = { username: '', articles: [] }
    const gun = Gun('localhost:8765/gun');

    const user = gun.user()
    user.recall({ sessionStorage: true })

    const pub = user.is?.pub;

    const gunArticles = gun.get('deNewsDb/articles');


    await gunArticles.map().on((article, id) => {


        if (article !== null && article.user === pub) {

            article.id = id;
            console.log(article, id);
            profile.articles.push(article);
        }
    });


    return { profile: profile }
}

export default Profile


