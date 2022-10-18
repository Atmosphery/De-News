import Gun, { GunCallbackPut, GunDataNode, IGun } from 'gun';
import React, { Component } from 'react';
import create_article from './create_article';
import * as obj from './objects';



const Article = (props: {article: any}) => {

    
        return (
            <div>
                <h1>{props.article.title}</h1>
                <div>{props.article.text}</div>
                <div>{props.article.author}</div>
                <div>{props.article.date}</div>
            </div>
        )
    

}
export default Article;