

import React from 'react';
//import not from 'gun/lib/not.js';
import _ from 'lodash';
import AppBar from '../components/appBar';

//import Quill from 'react-quill'









const create_article = ({gun, user,loggedIn,setLoggedIn, Quill }) => {

    let article = { id: '', author: '', title: '', date: '', text: '' };

    const saveArticle = (event) => {

        event.preventDefault();
        //debugger
        var elements = event.currentTarget.elements

        var pub;
        if(user.is.pub === undefined){
            pub = 'anonymous';
        }else{
            pub = user.is?.pub;
        }

        article = {
            id: pub,
            author: elements.author.value,
            title: elements.title.value,
            date: new Date().toString(),
            text: elements.text.value
        }

        gun
            .get('articles')
            .set(article, (ack) => {
                if (ack.err) {
                    console.log('An error happened while inserting')
                    console.log(ack.err);
                }
                console.log('Data Sucessfully inserted' +
                    `\ntitle: ${article.title}`)
            })
    }

    return (
        <main>
            <AppBar user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <div className='m-10 '>
                <form onSubmit={saveArticle}>
                    <div>
                        <label>Title</label><br />
                        <input name='title' className='input input-bordered w-full max-w-sm' />
                    </div>

                    <div className='my-5'>
                        <label>Text</label><br />

                        <div className=''><Quill /></div>
                    </div>

                    <div>
                        <label>Author</label><br />
                        <input name='author' className='input input-bordered w-full max-w-sm' />
                    </div>

                    <div>
                        <button className='btn'>Add</button>
                    </div>
                </form>
            </div>
        </main>

    );
}



export default create_article;

