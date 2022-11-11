
import React from 'react';
import parse from 'html-react-parser';
import _ from 'lodash'
require('gun/lib/unset.js')
require('gun/lib/path.js')
import $ from 'jquery'



const Article = (props) => {

    const gunArticles = props.gun;



    const handleEdit = async (newData, elementId) => {

        await gunArticles.map().once((data, id) => {
            if (id === props.id) {
                gunArticles.get(id).put({ [elementId]: newData })
            }
        });
    }


    const handleDelete = async (event) => {

        await gunArticles.map().once((data, id) => {
            if (id === props.id) {
                gunArticles.get(id).put(null);
                console.log(`${data} is deleted`);
            }
        });

        let arrRef = props.articles
        let newArr = arrRef.filter(article => article.id !== props.id);
        props.setArticles(newArr);
    }

    const clickItem = (element) => {
        element = $(element)
        let target = element.get(0).target;
        let elementId = target.id;
        let elementName = target.localName;

        if (elementName !== 'input') {

            let elementHTML = target.innerHTML;
            //debugger

            //Chnage html to an input
            target.innerHTML = `<input id='${elementId}' value='${elementHTML}'/>`;
            //Listener for confirming edit with enter
            console.log(elementId);
            document.getElementById(elementId).addEventListener('keyup', (event) => {

                if (event.key === 'Enter') {
                    //jQuery for input element, then get value
                    let inputValue = $('input').val();

                    handleEdit(inputValue, elementId);

                    target.innerHTML = inputValue;
                }
            });
        }


    }


    return (
        <div>
            <div className={'p-5 border-2 border-solid border-black w-full max-w-lg'}>
                <h1 id='title' onClick={clickItem} className='text-3xl font-bold underline'>{props.title}</h1>
                <div id='text' onClick={clickItem} className='m-5'>{parse(props.text)}</div>
                <div id='author' onClick={clickItem}>by: {props.author}</div>
                <div id='date' onClick={clickItem}>{props.date}</div>
            </div>
            <button className='btn btn-xs btn-outline' onClick={handleDelete}>Delete</button>
        </div>
    )

}





export default Article;