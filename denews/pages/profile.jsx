import { _GunRoot } from "gun"
import 'gun/sea';
import { useRouter } from "next/router"
import { useState } from "react";
import AppBar from "../components/appBar";
import Article from "./Article";
import Gun from 'gun'



const Profile = (props) => {


    const router = useRouter();
    let profile = { username: '', articles: [] }
    

    //console.log(props.user.is?.pub)
    //
    //console.log(reactArticles);

    

    


    const checkProfile = () => {
        console.log(profile)
        //console.log(getArticles())
    }

    // Once the user request finishes, show the user
    return (
        <main>
            <AppBar user={props.user} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
            <h1>Your Profile</h1>
            <button onClick={checkProfile} className={'btn'}>check</button>
            <div id="articles">
                {props.reactArticles}
            </div>
        </main>
    )
}

Profile.getInitialProps = async () => {

    let profile = { username: '', articles: [] }
    const gun = Gun('localhost:8765/gun');
    //console.log(gun);
    
    const user = gun.user()
    console.log(user)
    user.recall({sessionStorage: true})
    
    gun.get('articles').map().once((article) => {
        console.log(article);
        if (article.id === user.is?.pub) {
            profile.articles.push(article);
        }
    });

    const temp = [];
        for (let i = 0; i < profile.articles.length; i++) {
            
            const article = profile.articles[i];
            temp.push(
                <Article
                    author={article.author}
                    date={article.date}
                    id={article.id}
                    text={article.text}
                    title={article.title}
                    key={i} />);
        }

    return {
        reactArticles: temp
    }
}

export default Profile


// export async function getServerSideProps() {
    
    
// }

// if (!user.is) {


//     router.push('/login');
// } else {

//     let temp = new Array<ReactNode>
//     user.get('articles').map().once((data) => {
//         profile.articles.push(data);
//     });

//     for (let i = 0; i < profile.articles.length; i++) {
//         const article = profile.articles[i];
//         temp.push(<Article key={i} title={article.title} author={article.author} date={article.date} id={article.id} text={article.text} />)
//     }

//     setReactArticles(temp);
// }