import { _GunRoot } from "gun"
import 'gun/sea';
import { useRouter } from "next/router"
import { useState } from "react";
import AppBar from "../components/appBar";
import Article from "../components/Article";
import Gun from 'gun'
import _, { set } from 'lodash'
import { useEffect } from "react";
require('gun/lib/unset.js')
require('gun/lib/path.js')
import Login from './login'


// export async function getServerSideProps(context) {

//     let profile = { username: '', articles: [] }
//     const gun = Gun('localhost:8765/gun');

//     const user = gun.user()
//     user.recall({ sessionStorage: true })

//     await gun.get('articles').map().once((article) => {

//         if (article.user === user.is.pub) {
//             article.id = _.get(article, "_.#", undefined)

//             console.log(article);
//             profile.articles.push(article);
//         }
//     });

//     return {
//         props: {
//             profile: profile
//         }, // will be passed to the page component as props
//     }
// }


const Profile = (props) => {



    const router = useRouter();


    const articles = props.profile.articles;
    console.log(articles);

    const [reactArticles, setReactArticles] = useState([]);

    useEffect(() => {

        const articles = profileInit();
        setReactArticles(articles);
    }, [])


    const profileInit = () => {
        const tempArticles = [];
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            //console.log(article.text)
            tempArticles.push(
                <Article
                    author={article.author}
                    date={article.date}
                    user={props.user.is.pub}
                    id={_.get(article, "_.#", undefined)}
                    text={article.text}
                    title={article.title}
                    key={i}
                />
            );
        }
        return tempArticles;
    }

    console.log(reactArticles);



    return (
        <main>
            <AppBar user={props.user} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
            <div className="m-5">
                <h1>Your Profile</h1>
                <div id="articles" className="mt-5">
                    <strong>Your Articles</strong>
                    {reactArticles}
                    <div>

                    </div>

                </div>
            </div>

        </main>
    )
}

Profile.getInitialProps = async () => {

    let profile = { username: '', articles: [] }
    const gun = Gun('localhost:3000/gun');

    const user = gun.user()
    user.recall({ sessionStorage: true })

    const pub = user.is?.pub;

    const gunArticles = gun.get('articles');

    await gunArticles.on((data) => {
        console.log(data)
    })



    //article => article.user === pub && article !== null ? article : undefined



    await gunArticles.map().on((article, id) => {


        console.log(article, id);


        if (article !== null && id !== '#' && id !== '>') {

            article.id = id;
            //console.log(article)
            profile.articles.push(article);
        }




    });






    return { profile: profile }
}




export default Profile


