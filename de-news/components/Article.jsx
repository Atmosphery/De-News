
import React from 'react';
import parse from 'html-react-parser';
import _ from 'lodash'
import { useEffect } from 'react';
require('gun/lib/unset.js')
require('gun/lib/path.js')


const Article = (props) => {

    const gunArticles = props.gun;

    const handleEdit = (id) => {

      

    }

    // gun.get('articles').on((data) => {
    //     console.log(data);
    // })

    const handleDelete = async (event) => {


        let _id = ''
        await gunArticles.map().once((data, id) => {
            if (id === props.id) {
                gunArticles.get(id).put(null);
                console.log('is deleted');
            }
            //gunArticles.path(id).put(null);

        });


        //debugger
        let arrRef = props.articles
        console.log(arrRef.length)
        

        let newArr = arrRef.filter(article => article.id !== props.id);
        
        
        console.log(newArr);
        console.log(props.articles);
        props.setArticles(newArr);

    }

    //console.log(props.text)
    return (
        <div className='m-5'>
            <div className={'p-5 border-2 border-solid border-black w-full max-w-lg'}>
                <h1>{props.title}</h1>
                <div className='m-5'>{parse(props.text)}</div>
                <div>by: {props.author}</div>
                <div>{props.date}</div>
                {props.id}

            </div>
            <button className='btn btn-xs btn-outline' onClick={handleEdit()}>Edit</button>
            <button className='btn btn-xs btn-outline' onClick={handleDelete}>Delete</button>
        </div>
    )


}
export default Article;