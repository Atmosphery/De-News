import { IGun, IGunInstance } from 'gun';
import Image from 'next/image';
import Link from 'next/link';
import React, { Component } from 'react';
import { CgProfile } from 'react-icons/cg'

interface IProps {
    barTitle: string
}


const AppBar = (props: IProps) => {
    return (
        <div className='flex justify-between rounded-b-lg border-black bg-blue-300 p-5 text-black'>
            <Link href='/'>
                <button className='hover:text-blue-500 text-3xl font-bold'>De-News!</button>
            </Link>
            <div className='text-2xl'>{props.barTitle}</div>
            <div>
                <Link href={'/create_article'}>
                    <button className='btn mr-2 text-sm'>Post an article!</button>
                </Link>
                <Link href={'/login'}>
                    <button className='btn text-sm'>Login<CgProfile className='ml-2' size={35} /></button>
                </Link>
            </div>
        </div>
    );

}


export default AppBar;

