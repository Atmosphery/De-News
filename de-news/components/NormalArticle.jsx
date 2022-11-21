
import React from 'react';
import parse from 'html-react-parser';
import _ from 'lodash'
require('gun/lib/unset.js')
require('gun/lib/path.js')
import Link from 'next/link';


const Article = (props) => {

    return (
        <div className='mt-5 mb-5'>
            <div className={'p-3 border-2 border-solid border-black w-screen max-w-7xl'}>
                <Link href={`/article/${props.id}`}>
                    <div className='flex flex-col items-center'>
                        <h1 id='title' >{props.title}</h1>
                        <div id='text'>{parse(props.text)}</div>
                    </div>
                </Link>
                <div className='flex items-end'>
                    <div className='flex-1'>
                        <Link id='author' className='flex hover:text-blue-700' href={`/profile/${props.user}`}>
                            <p className='mr-2'>By:</p>{props.author}
                        </Link>
                        <div><p className='mr-2'>Posted:</p><p id='date'>{props.date}</p></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article;