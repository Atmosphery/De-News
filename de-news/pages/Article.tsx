import Gun, { GunCallbackPut, GunDataNode, IGun } from 'gun';
import React, { Component } from 'react';
import create_article from './create_article';
import { IArticle } from './objects';



const Article = (props: IArticle) => {


    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                {props.text}
            </div>
            <div>{props.author}</div>
            <div>{props.date}</div>
        </div>
    )


}
export default Article;