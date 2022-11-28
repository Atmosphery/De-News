
import React from 'react';
import parse from 'html-react-parser';
import _ from 'lodash'
require('gun/lib/unset.js')
require('gun/lib/path.js')
import Link from 'next/link';
import Image from 'next/image'
import { useState } from 'react';
import path from 'path';
import fs from 'fs/promises';
import { useEffect } from 'react';


const Article = (props) => {





    const [thumbnail, setThumbnail] = useState('');

    useEffect(() => {
        if (props.thumbnail !== undefined) {
            setThumbnail(<figure><img className='w-56 ' src={`/images/${props.thumbnail}`} alt='' /></figure>)
        }
    }, [])



    return (
            <div className="m-5 card card-compact w-96 bg-base-200 shadow-md hover:border rounded-2xl border-primary justify-center">
                <Link href={`/article/${props.id}`}>
                    {thumbnail}
                    <div className="card-body">
                        <h2 className="card-title">{props.title}</h2>

                        <div className="card-actions flex-col">
                            <Link id='author' className='flex link link-primary' href={`/profile/${props.user}`}>
                                <p className='mr-2'>By:</p>{props.author}
                            </Link>
                            <div className='flex'><p className='mr-2'>Posted:</p><p id='date'>{props.date}</p></div>

                        </div>
                    </div>
                </Link>
            </div>
    )
}

//<div className='m-10 flex flex-col items-center hover:border rounded-2xl border-primary card p-5 max-w-lg shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 '>
//     {thumbnail}
//     <div className={''}>
//         <Link href={`/article/${props.id}`}>
//             <h1 id='title' className='text-3xl' >{props.title}</h1>
//         </Link>
//         <div className='card-actions flex items-end'>
//             <div className='flex-1'>
//                 <Link id='author' className='flex link link-primary' href={`/profile/${props.user}`}>
//                     <p className='mr-2'>By:</p>{props.author}
//                 </Link>
//                 <div className='flex'><p className='mr-2'>Posted:</p><p id='date'>{props.date}</p></div>
//             </div>
//         </div>
//     </div>
// </div>

export default Article;