
import React from 'react';
import parse from 'html-react-parser';
import _ from 'lodash'
require('gun/lib/unset.js')
require('gun/lib/path.js')


const Article = (props) => {

    const gun = props.gun;

    const handleEdit = (id) => {



    }

    // gun.get('articles').on((data) => {
    //     console.log(data);
    // })

    const handleDelete = async (event) => {


        let listData;

        const gunArticles = gun.get('articles');



        await gunArticles.once((data) => {

            //console.log(data);
            listData = data;
            //gunArticles.path(id).put(null);
            //console.log('is deleted');
        });


        delete listData[props.id];
        console.log(listData);
        await gunArticles.put(listData);

        let arrRef = props.reactArticles
        let newArr = []
        for (let i = 0; i < arrRef.length; i++) {
            const reactComp = arrRef[i];
//left of HEREEEEEEEEEEEEE
            console.log(reactComp.props.id);
            console.log(reactComp.props.id !== props.id);
            if (reactComp.props.id !== props.id) {
                
                newArr.push(reactComp);
            }
        }
        console.log(newArr);
        //props.setReactArticles(newArr);
        //gunArticles.unset(toDelete)

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