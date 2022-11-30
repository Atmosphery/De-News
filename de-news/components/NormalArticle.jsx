
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
            setThumbnail(<figure><img className='object-contain rounded-2xl ' src={props.thumbnail} alt='' /></figure>)
        }
    }, [])

    return (
            <div className="break-inside-avoid m-5 card 
            card-compact w-96 bg-base-200 
            shadow-md 
            rounded-2xl border border-transparent 
            hover:border hover:rounded-2xl hover:border-primary 
            justify-center">
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

export default Article;