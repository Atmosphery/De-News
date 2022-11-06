import { _GunRoot } from "gun"
import 'gun/sea';
import { useRouter } from "next/router"
import { useState } from "react";
import AppBar from "../components/appBar";
import Article from "../components/Article";
import Gun from 'gun'
import _, { set } from 'lodash'



const Profile = (props) => {

    const router = useRouter();
    //const articles = props.profile.articles

    const [reactArticles, setReactArticles] = useState([])

    console.log(props.profile)
    let temp = []
    props.gun.get('articles').map().on((article) => {
            var i = 0
            console.log(i)
            temp.push(
    
                <Article
                    author={article.author}
                    date={article.date}
                    id={_.get(article, "_.#", undefined)}
                    text={article.text}
                    title={article.title}
                    key={i}
                />
            )
            
            i++;
            
    });
    
    if(!props.user.is){
        router.push('/login')
    }
    
    setReactArticles(temp)


    

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

// Profile.getInitialProps = async () => {

//     let profile = { username: '', articles: [] }
//     const gun = Gun('localhost:8765/gun');

//     const user = gun.user()
//     user.recall({ sessionStorage: true })

//     // await gun.get('articles').map().once((article) => {

//     //     if (article.user === user.is?.pub) {
//     //         article.id =_.get(article, "_.#", undefined)
//     //         console.log(article)
//     //         profile.articles.push(article);
//     //     }
//     // });



//     return { profile: profile }
// }

export default Profile


