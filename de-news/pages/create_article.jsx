

import React from 'react';
//import not from 'gun/lib/not.js';
import _ from 'lodash';
import AppBar from '../components/appBar';
import dynamic from "next/dynamic";
import { useState } from 'react';
const Quill = dynamic(() => import('react-quill'), { ssr: false });
//import Quill from 'react-quill'


const Create_article = ({ gun, user, loggedIn, setLoggedIn }) => {

    let article = { id: '', author: '', title: '', date: '', text: '' };

    let [editorHtml, setEditorHtml] = useState('');


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
            author: elements.author.value,
            title: elements.title.value,
            date: new Date().toString(),
            text: editorHtml
        }


        gun
            .get('articles')
            .set(article, (ack) => {
                if (ack.err) {
                    console.log('An error happened while inserting')
                    console.log(ack.err);
                }
                console.log('Data Sucessfully inserted' +
                    `\ntitle: ${ack.err}}`)
            })
    }

    const handleEditorChnage = (html) => {
        setEditorHtml(html);
        console.log(html)
    }

    return (
        <main>
            <AppBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <div className='m-10 '>
                <form onSubmit={saveArticle} className='flex'>
                    <div className='flex-col'>
                        <div>
                            <label>Title</label><br />
                            <input name='title' className='input input-bordered w-full max-w-sm' />
                        </div>

                        <div className='my-5'>
                            <label>Author</label><br />
                            <input name='author' className='input input-bordered w-full max-w-sm' />
                        </div>

                        <div>
                            <button className='btn'>Add</button>
                        </div>
                    </div>

                    <div className='ml-20 flex-1'>
                        <label>Text</label><br />
                        <div className=''>
                            <Quill
                                name='text'
                                className='bg-white text-black w-full'
                                theme='snow'
                                value={editorHtml}
                                onChange={handleEditorChnage}
                            />
                        </div>
                    </div>




                </form>
            </div>
        </main>

    );
}





export default Create_article;

