import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import parse from 'html-react-parser';
import AppBar from '../../components/appBar';
import Link from 'next/link'

const ArticleView = ({ gun, user, loggedIn, setLoggedIn }) => {
    const router = useRouter()
    const { id } = router.query

    const [currentArticle, setCurrent] = useState({});

    useEffect(() => {
        (async function () {
            await gun.get('articles').map(article => article !== null ? article : undefined).once((article, _id) => {

                if (id == _id && article.text != undefined) {
                    article.text = parse(article.text);
                    setCurrent(article);
                }
            });
        })
            ();
    }, [router])

    return (
        <main>
            <div className='flex flex-col items-center ml-5'>
                <h1 id='title' >{currentArticle.title}</h1>
                <img src={`/images/${currentArticle.thumbnail}`} alt=''></img>
                <div id='text' className='m-5'>{currentArticle.text}</div>
            </div>
            <div className='flex items-center ml-10'>
                <div className='flex-1'>
                    <Link id='author' className='flex hover:text-blue-700' href={`/profile/${currentArticle.user}`}>
                        <p className='mr-2'>By:</p>{currentArticle.author}
                    </Link>
                    <div className='flex'><p className='mr-2'>Posted:</p><p id='date'>{currentArticle.date}</p></div>
                </div>
            </div>
        </main>

    )
}

export default ArticleView
