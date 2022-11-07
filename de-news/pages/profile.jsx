import { _GunRoot } from "gun"
import 'gun/sea';
import { useRouter } from "next/router"
import { useState } from "react";
import AppBar from "../components/appBar";
import Article from "../components/Article";
import Gun from 'gun'
import _, { set } from 'lodash'
import ReactQuill from "react-quill";



const Profile = (props) => {

    const router = useRouter();
    if (!props.user.is) {
        router.push('/login')
    }

    const profile = props.profile;

    const articles = profile.articles;
    const [reactArticles, setReactArticles] = useState([]);

    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];

        reactArticles.push(
            <Article
                author={article.author}
                date={article.date}
                id={_.get(article, "_.#", undefined)}
                text={article.text}
                title={article.title}
                key={i}
            />
        );
    }



    
    console.log(profile);

    //const [reactArticles, setReactArticles] = useState(tempArticles)

    return (
        <main>
            <AppBar user={props.user} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
            <div className="m-5">
                <h1>Your Profile</h1>
                <div id="articles" className="mt-5">
                    <strong>Your Articles</strong>
                    <div>
                        {reactArticles}
                    </div>

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

    await gun.get('articles').map().once((article) => {

        if (article.user === user.is.pub) {
            article.id = _.get(article, "_.#", undefined)
            //console.log(article)
            profile.articles.push(article);
        }
    });

    
    //console.log(profile);
    return {
        profile: profile
    }
}

export default Profile


