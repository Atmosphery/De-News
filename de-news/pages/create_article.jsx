

import React from 'react';
//import not from 'gun/lib/not.js';
import _ from 'lodash';
import AppBar from '../components/appBar';
import dynamic from "next/dynamic";
import { useState } from 'react';
import { useEffect } from 'react';
const Quill = dynamic(() => import('react-quill'), { ssr: false });


const Create_article = ({ gun, user, loggedIn, setLoggedIn }) => {

    let article = { id: '', author: '', title: '', date: '', text: '' };

    const [editorHtml, setEditorHtml] = useState('</br></br></br></br></br></br></br></br></br></br></br></br></br></br></br>');
    const [articleAdded, setArticleAdded] = useState(<div></div>);

    let username;

        useEffect(() =>{
            username = sessionStorage.getItem('currentUsername');
            console.log(username) 
        })

    const saveArticle = (event) => {

        

        event.preventDefault();

        //debugger
        var elements = event.currentTarget.elements

        var pub;
        if (user.is.pub === undefined) {
            pub = 'anonymous';
        } else {
            pub = user.is?.pub;
        }

        article = {
            id: '',
            user: pub,
            author: username,
            title: elements.title.value,
            date: new Date().toUTCString(),
            text: editorHtml
        }


        gun
            .get('articles')
            .set(article, (ack) => {
                if (ack.err) {
                    console.log('An error happened while inserting')
                    setArticleAdded(<h2 className='text-green-700'>An error occured, Article was not inserted</h2>);
                    console.log(ack.err);
                } else {
                    console.log('Data Sucessfully inserted')
                    setArticleAdded(<h2 className='text-green-700'>Article '{article.title}' was added</h2>);

                }

            });
    }

    const handleEditorChnage = (html) => {

        setEditorHtml(html);
        console.log(editorHtml);
        console.log(html)
    }

    return (
        <main>
            <AppBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <div className='m-10 '>
                <form onSubmit={saveArticle} className='flex'>
                    <div className='flex-col w-screen max-w-6xl'>
                        <div>
                            <label>Title</label><br />
                            <input name='title' className='input input-bordered w-full max-w-sm' />
                        </div>

                        <div className='mt-5'>
                            <label>Text</label><br />
                            <div className='mt-2'>
                                <Quill
                                    name='text'
                                    className='bg-white text-black w-full'
                                    theme='snow'
                                    value={editorHtml}
                                    onChange={handleEditorChnage}
                                />
                            </div>
                        </div>


                        {articleAdded}
                        <div className='mt-5'>
                            <button className='btn'>Add</button>
                        </div>
                    </div>

                </form>
            </div>
        </main>

    );
}

export default Create_article;

