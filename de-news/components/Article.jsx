
import React from 'react';
import parse from 'html-react-parser';
import _ from 'lodash'
import { useEffect } from 'react';
require('gun/lib/unset.js')
require('gun/lib/path.js')
import style from '../styles/article.module.css'

const Article = (props) => {

    const gunArticles = props.gun;

    const handleEdit = () => {

        

    }


    const handleDelete = async (event) => {

        await gunArticles.map().once((data, id) => {
            if (id === props.id) {
                gunArticles.get(id).put(null);
                console.log(`${data} is deleted`);
            }

        });

        let arrRef = props.articles
        console.log(arrRef.length)

        let newArr = arrRef.filter(article => article.id !== props.id);

        console.log(newArr);
        console.log(props.articles);
        props.setArticles(newArr);
    }

    return (
        <div className={style.article}>
            <div className={'p-5 border-2 border-solid border-black w-full max-w-lg'}>
                <h1>{props.title}</h1>
                <div className='m-5'>{parse(props.text)}</div>
                <div>by: {props.author}</div>
                <div>{props.date}</div>
                {props.id}

            </div>
            <button className='btn btn-xs btn-outline' onClick={handleEdit}>Edit</button>
            <button className='btn btn-xs btn-outline' onClick={handleDelete}>Delete</button>
        </div>
    )

}
export default Article;