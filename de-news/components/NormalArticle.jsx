
import React from 'react';
import parse from 'html-react-parser';
import _ from 'lodash'
require('gun/lib/unset.js')
require('gun/lib/path.js')
import Link from 'next/link';


const Article = (props) => {

    return (
        <div className='mt-5 mb-5'>
            <div className={'card p-5 w-screen max-w-3xl bg-base-200 shadow-xl hover:border'}>
                <Link href={`/article/${props.id}`}>
                    <div id='text' className='card-body'>{parse(props.text)}</div>
                </Link>
                <div className='card-actions flex items-end'>
                    <div className='flex-1'>
                        <Link id='author' className='flex link link-primary' href={`/profile/${props.user}`}>
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