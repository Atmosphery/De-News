import { IGunInstance } from 'gun';

import React, { Component, FormEvent } from 'react';
import * as obj from './objects';
import Article from './Article';
//import not from 'gun/lib/not.js';
import _ from 'lodash';

interface FormElements extends HTMLFormControlsCollection {
    id: HTMLInputElement;
    title: HTMLInputElement;
    text: HTMLInputElement;
    author: HTMLInputElement;
}

interface MyFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface IProps {
    gun: IGunInstance;

}

interface IState {
    article: obj.IArticle
    currentId: string
}


class PostToGun extends Component<IProps, IState> {
    gun: IGunInstance;


    constructor(props: IProps) {
        super(props);

        this.gun = props.gun;

        this.state = {
            article: {
                id: '',
                title: '',
                text: '',
                author: '',
                date: ''
            },
            currentId: ''
            //this.gun.get('articles').map(article => article.id === 0? article: undefined).once()
        }

        this.saveArticle = this.saveArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        //debugger
        // this.gun.get('articles').get(this.state.currentId.toString()).on((data:any, key:string) => {
        //     this.setState({article: data})
        // });

        
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
            <div>
                <form onSubmit={this.saveArticle}>
                    <div>
                        <label>Title</label><br />
                        <input name='title' className='border-2 border-style: solid border-black' />
                    </div>

                    <div>
                        <label>Text</label><br />
                        <input name='text' className='border-2 border-style: solid border-black' />
                    </div>

                    <div>
                        <label>Author</label><br />
                        <input name='author' className='border-2 border-style: solid border-black' />
                    </div>



                    <div>
                        <button className='border-2 border-style: dotted border-black mt-3'>Add</button>
                    </div>
                </form>

                <div>
                    <Article article={this.state.article} />
                </div>
            </div>
        );
    }

}
export default PostToGun;

