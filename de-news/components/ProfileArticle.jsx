
import React from 'react';
import parse from 'html-react-parser';
import _, { set } from 'lodash'
require('gun/lib/unset.js')
require('gun/lib/path.js')
import $ from 'jquery'
import { useState } from 'react';
import dynamic from "next/dynamic";
import { useEffect } from 'react';
const Quill = dynamic(() => import('react-quill'), { ssr: false });




const Article = (props) => {

    const gunArticles = props.gun;
    const [itemClicked, setClicked] = useState(false);
    const [textEditState, setTextEditState] = useState(parse(props.text));
    const [editorHtml, setEditorHtml] = useState(props.text);
    const [submit, setSubmit] = useState(false);


    const handleEdit = async (newData, elementId) => {

        await gunArticles.map().once((data, id) => {
            if (id === props.id) {
                gunArticles.get(id).put({ [elementId]: newData });
            }
        });

    }


    const handleDelete = async (event) => {
        // debugger
        console.log(props.id);
        await gunArticles.map().once((data, id) => {
            if (id === props.id) {

                gunArticles.get(id).put(null);
                console.log(`${data} is deleted`);
            }
        });

        let arrRef = props.articles
        //let newArr = arrRef.filter();
        //console.log(newArr);
        props.setArticles(state => {
            console.log(state)
            let filtered = state.filter(article => article.id !== props.id);
            console.log(filtered);
            return filtered
        });
        console.log(articles);

    }

    gunArticles.on((value) => {
        console.log(value);
    })

    const clickItem = (element) => {
        if (!itemClicked) {
        
            setClicked(true);
            element = $(element)
            let target = element.get(0).target;
            let elementId = target.id + 'Inner';
            let elementName = target.localName;

            if (elementName !== 'input') {

                let elementHTML = target.innerHTML;


                //Chnage html to an input
                target.innerHTML = `<input id='${elementId}' value='${elementHTML}'/>`;
                //Listener for confirming edit with enter
                console.log(elementId);
                document.getElementById(elementId).addEventListener('keyup', (event) => {

                    if (event.key === 'Enter') {
                        
                        //jQuery for input element, then get value
                        let inputValue = $(`#${elementId}`).val();
                        handleEdit(inputValue, target.id);
                        setClicked(false);
                        target.innerHTML = inputValue;
                    }
                });
            }
        }
    }


    useEffect(() => {
        console.log(itemClicked, 'itemClicked');
        console.log(submit, "submit")
        if (submit) {
            let element = $('#text').get(0);
            console.log(element);

            handleEdit(editorHtml, element.id);
            //element.innerHTML = editorHtml;
            setTextEditState(parse(editorHtml));
            setClicked(false);
            setSubmit(false);
        }

    }, [editorHtml, itemClicked, submit])

    const handleTextEditBtn = (target) => {
        setSubmit(true);
        console.log(submit);
        setClicked(false);
    }

    const handleEditorChnage = (html) => {

        setEditorHtml(html);
        console.log(editorHtml);
    }


    const handleTextClick = (element) => {
        element = $(element);
        const target = element.get(0).currentTarget;
        //console.log(itemClicked);
        if (!itemClicked) {

            console.log(itemClicked);
            setClicked(true);
            console.log(itemClicked);

            setTextEditState(<>
                <Quill
                    name='text'
                    className='bg-white text-black w-full'
                    theme='snow'
                    value={editorHtml}
                    onChange={handleEditorChnage}
                />
                <button id='btnSubmitEdit' className='btn btn-xs btn-outline mt-1' onClick={() => {
                    handleTextEditBtn(target);

                }}>Submit Edit</button>
            </>
            )


        }
    }


    return (
        <div className='mt-5 mb-5'>
            <div className={'card p-5 max-w-screen-2xl whitespace-pre-wrap bg-base-200 shadow-xl rounded-2xl border border-transparent hover:border hover:rounded-2xl hover:border-primary '}>
                <div className='flex flex-col items-center'>
                    <h1 id='title' onClick={clickItem}>{props.title}</h1>
                    <div id='text' onClick={handleTextClick} className='card-body m-5'>{textEditState}</div>
                </div>
                <div className='flex items-end'>
                    <div className='flex-1'>
                        <div className='flex link link-primary'><p className='mr-2 '>By:</p><p id='author'>{props.author}</p></div>
                        <div><p className='mr-2'>Posted:</p><p id='date'>{props.date}</p></div>
                    </div>
                    <button className='btn btn-sm btn-outline mt-1' onClick={handleDelete}>Delete</button>

                </div>


            </div>
        </div>
    )

}

export default Article;