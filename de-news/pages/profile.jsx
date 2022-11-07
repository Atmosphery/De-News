import { _GunRoot } from "gun"
import 'gun/sea';
import { useRouter } from "next/router"
import { useState } from "react";
import AppBar from "../components/appBar";
import Article from "../components/Article";
import Gun from 'gun'
import _, { set } from 'lodash'
import { useEffect } from "react";


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
    if (!props.user.is) {
        router.push('/login')
    }

    const [profile, setProfile] = useState({ username: '', articles: [] });
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let tempProfile = {};
        
        props.gun.get('articles').once((article) => {

            if (article.user === props.user.is.pub) {
                article.id = _.get(article, "_.#", undefined)
                console.log(article);

                tempProfile.username = props.user.is.pub;
                tempProfile.articles = []
                tempProfile.articles.push(article);
                //left off here you are tyring client side data fetching
            }
        })
        setProfile(tempProfile);
        if (profile !== undefined) {
            setLoading(false);
        }
    })

    if (isLoading) return <p>Loading...</p>
    if (profile.username === '') return <p>No User Data!</p>

    // const articles = profile.articles;

    // const reactArticles = [];
    // for (let i = 0; i < articles.length; i++) {
    //     const article = articles[i];

    //     reactArticles.push(
    //         <Article
    //             author={article.author}
    //             date={article.date}
    //             id={_.get(article, "_.#", undcefined)}
    //             text={article.text}
    //             title={article.title}
    //             key={i}
    //         />
    //     );
    // }

    console.log(profile);


    return (
        <main>
            <AppBar user={props.user} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
            <div className="m-5">
                <h1>Your Profile</h1>
                <div id="articles" className="mt-5">
                    <strong>Your Articles</strong>
                    <div>
                        {profile.articles}
                    </div>

                </div>
            </div>

        </main>
    )
}




export default Profile


