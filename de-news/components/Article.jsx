
import React from 'react';
import parse from 'html-react-parser';
import _ from 'lodash'
require('gun/lib/unset.js')
require('gun/lib/path.js')


const Article = (props) => {
    let parser = new DOMParser();

    const handleEdit = (id) => {



    }

    const handleDelete = async (event) => {
        const gun = Gun('localhost:3000/gun')

        let toDelete;

        const gunArticles = gun.get('articles');



        await gunArticles.map(article => article !== null ? article : undefined).once((data, id) => {


            //console.log(articlesDB);
            if (id === props.id) {
                console.log(data);
                toDelete = data;
                //gunArticles.path(id).put(null);
                gunArticles.unset(_.get(data, '_'))
                //console.log('is deleted');
            }
        });



        console.log(toDelete)


        await gunArticles.on((data) => {
            console.log(data);
        })





        // for (let i = 0; i < articlesDB.length; i++) {
        //     const article = articlesDB[i];
        //     console.log(article);
        //     if(article === props.id){

        //     }
        // }


    }

    //console.log(props.text)
    return (
        <div className='m-5'>
            <div className={'p-5 border-2 border-solid border-black w-full max-w-lg'}>
                <h1>{props.title}</h1>
                <div className='m-5'>{parse(props.text)}</div>
                <div>by: {props.author}</div>
                <div>{props.date}</div>


            </div>
            <button className='btn btn-xs btn-outline' onClick={handleEdit()}>Edit</button>
            <button className='btn btn-xs btn-outline' onClick={handleDelete}>Delete</button>
        </div>
    )


}
export default Article;