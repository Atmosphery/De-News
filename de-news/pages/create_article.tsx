
import Gun from 'gun'
import { IGunInstance } from 'gun/types';

import React, { Component, FormEvent } from 'react';
import * as obj from './objects';
import Article from './Article';
//import not from 'gun/lib/not.js';
import _ from 'lodash';
import AppBar from '../components/appBar';
import { IArticle, IGlobalState } from './objects';

interface FormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement;
    text: HTMLInputElement;
    author: HTMLInputElement;
}

interface MyFormElement extends HTMLFormElement {
    readonly elements: FormElements
}






const create_article = ({ user,loggedIn,setLoggedIn }: IGlobalState) => {

    let article: IArticle = { id: '', author: '', title: '', date: '', text: '' };

    const saveArticle = (event: FormEvent<MyFormElement>) => {

        event.preventDefault();
        //debugger
        var elements = event.currentTarget.elements

        article = {
            id: user.is?.pub as string,
            author: elements.author.value,
            title: elements.title.value,
            date: new Date().toString(),
            text: elements.text.value
        }

        user
            .get('articles')
            .set(article, (ack: any) => {
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
                        <input name='text' className='input input-bordered w-full max-w-sm' />
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

