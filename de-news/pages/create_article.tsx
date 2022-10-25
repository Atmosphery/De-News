
import Gun from 'gun'
import { IGunInstance } from 'gun/types';

import React, { Component, FormEvent } from 'react';
import * as obj from './objects';
import Article from './Article';
//import not from 'gun/lib/not.js';
import _ from 'lodash';
import AppBar from './components/appBar';
import { getGun } from './api/GunApi';

interface FormElements extends HTMLFormControlsCollection {
    id: HTMLInputElement;
    title: HTMLInputElement;
    text: HTMLInputElement;
    author: HTMLInputElement;
}

interface MyFormElement extends HTMLFormElement {
    readonly elements: FormElements
}



interface IState {
    article: obj.IArticle
    currentId: string
}


class create_article extends Component<{}, IState> {
    gun: IGunInstance;


    constructor(props: any) {
        super(props);
        this.gun = Gun(process.env.db_dev);


        this.state = {
            article: {
                id: '',
                title: '',
                text: '',
                author: '',
                date: ''
            },
            currentId: ''
        }

        this.saveArticle = this.saveArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (this.gun === undefined) {
            this.gun = Gun(process.env.GunDbStr_dev);
        }
    }


    handleChange(event: FormEvent) {


    }



    saveArticle = (event: FormEvent<MyFormElement>) => {

        //debugger
        this.setState({

            article: {
                id: event.currentTarget.id,
                title: event.currentTarget.elements.title.value,
                text: event.currentTarget.elements.text.value,
                author: event.currentTarget.elements.author.value,
                date: new Date().toString()
            },
            currentId: event.currentTarget.id
        })




        this.gun
            .get('articles')
            .set(this.state.article, (ack: any) => {
                if (ack.err) {
                    console.log('An error happened while inserting')
                    console.log(ack.err);
                }
                console.log('Data Sucessfully inserted' +
                    `\ntitle: ${this.state.article.title}`)
            })

        event.preventDefault();
    }





    render() {
        return (
            <main>
                <AppBar title='Publish' user={this.gun.user()} />
                <div className='m-10 '>
                    <form onSubmit={this.saveArticle}>
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
                            <button className='border-2 border-style: dotted border-black mt-3'>Add</button>
                        </div>
                    </form>
                </div>

                <div>
                    <Article article={this.state.article} />
                </div>
            </main>

        );
    }

}
export default create_article;

