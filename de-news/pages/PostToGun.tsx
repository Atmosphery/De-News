import exp from 'constants';
import Gun, { GunCallbackPut, GunDataNode, IGun, IGunInstance } from 'gun';

import React, { Component, EventHandler, FormEvent } from 'react';
import * as obj from './objects';
import Article from './Article';
const not = require('gun/lib/not.js');
import { getEnabledCategories } from 'trace_events';
import { createRoot } from 'react-dom/client';
import { rootCertificates } from 'tls';

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
}


class PostToGun extends Component<IProps, IState> {
    gun: IGunInstance;


    constructor(props: IProps) {
        super(props);

        this.gun = props.gun;

        this.state = {
            article: {
                id: 0,
                title: '',
                text: '',
                author: '',
                date: ''
            }
            //this.gun.get('articles').map(article => article.id === 0? article: undefined).once()
        }

        this.saveArticle = this.saveArticle.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        
        // this.gun.get('articles').get().map(_article => _article.id === 0? _article: undefined).once((_article, id) => {
        //     this.setState({article: _article})
        // })
    }


    handleChange(event: FormEvent) {
        
        
    }
    
    checkValue() {
        //debugger
        return this.gun
        .get('articles').get(this.state.article.id.toString()).on((data: any, key: string) => {
            console.log(data)
            console.log(key)

        })
    }

    saveArticle = (event: FormEvent<MyFormElement>) => {
        //debugger
        this.setState({
            article: {
                id: 0,
                title: event.currentTarget.elements.title.value,
                text: event.currentTarget.elements.text.value,
                author: event.currentTarget.elements.author.value,
                date: new Date().toString()

            }
        })

        let tempArticle = this.state.article;
        this.gun
            .get('articles')
            //for each through 'articles' node
            .map((article: obj.IArticle) => {
                let lastIndex: number = 0;
                if (article === undefined) {
                    tempArticle.id = lastIndex;
                    this.setState({ article: tempArticle })
                    this.put({
                        id: this.state.article.id,
                        title: this.state.article.title,
                        text: this.state.article.text,
                        author: this.state.article.author,
                        date: this.state.article.date,
                    });
                } else {
                    lastIndex = article.id;
                }

            })

        
        event.preventDefault();

        // const root = createRoot(document.getElementById('article')!)

        // root.render(
        //     <Article article={this.state.article} />
        // )
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
                    <Article article={this.checkValue()} />
                </div>
            </div>
        );
    }

}
export default PostToGun;

