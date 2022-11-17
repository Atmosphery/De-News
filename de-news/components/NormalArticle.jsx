
import React from 'react';
import parse from 'html-react-parser';
import _, { set } from 'lodash'
require('gun/lib/unset.js')
require('gun/lib/path.js')
import $ from 'jquery'
import { useState } from 'react';
import dynamic from "next/dynamic";
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const Quill = dynamic(() => import('react-quill'), { ssr: false });



const Article = (props) => {
    const router = useRouter();
    

    const handleClick = (e) => {
        
        router.push(`/article/${props.id}`)
    }

    

    return (
        <div className='mt-5 mb-5' onClick={handleClick}>
            <div className={'p-3 border-2 border-solid border-black w-screen max-w-7xl'}>
                <div className='flex flex-col items-center'>
                    <h1 id='title' >{props.title}</h1>
                    <div id='text' className='m-5'>{parse(props.text)}</div>
                </div>
                <div className='flex items-end'>
                    <div className='flex-1'>
                        <div className='flex'><p className='mr-2'>By:</p><p id='author'>{props.author}</p></div>
                        <div><p className='mr-2'>Posted:</p><p id='date'>{props.date}</p></div>
                    </div>
                </div>


            </div>
        </div>
    )

}

export default Article;