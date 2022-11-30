//require('gun/sea');
import Link from 'next/link';

import React, { Component } from 'react';
import { CgProfile } from 'react-icons/cg'
import { HiMenuAlt1 } from 'react-icons/hi'
import { themeChange } from 'theme-change'
import { useEffect } from 'react'
import SearchBar from './SearchBar';
import { useState } from 'react';
import {useRouter} from 'next/router'






const AppBar = (props) => {

    const router = useRouter();

    const themeValues = [
        "Cupcake",
        "Forest",
        "Aqua",
        "Light",
    ]




    const [searchData, setData] = useState([]);

    useEffect(() => {
        themeChange(false);
    }, [])


    useEffect(() => {
        const gun = props.gun.get('articles');
        const tempArr = [];

        (async function () {
            await gun.map(article => article !== null ? article : undefined).once((article) => {

                tempArr.push(article);

            })
        })
            ();

        setData(tempArr);
    }, [])

    const checkLogin = () => {
        //let user = gun.user();
        if (props.user.is) {
            console.log('You are logged in');
            return true
        } else {
            console.log('You are not logged in');
            return false
        }
    }

    const handleLoginbtnClick = () => {
        if (checkLogin()) {
            Logout()
        } else {
            Login()
        }
    }

    const Login = () => {
        router.push('/login')
    }

    const Logout = () => {
        props.user.leave();
        props.setLoggedIn(checkLogin());
        sessionStorage.setItem('currentUsername', '')
        router.push('/');
    }
    props.setLoggedIn(checkLogin());




    return (

        <nav className='sticky navbar inline-flex z-10 shadow-xl bg-base-300 bg-opacity-95'>
            <div className='navbar-start'>
                <div className='dropdown'>
                    <label tabIndex={0} className='btn bg-base-100 btn-circle border-base-200'>
                        <HiMenuAlt1 size={25} />
                    </label>
                    <ul tabIndex={0} className='menu dropdown-content mt-3 p-3 shadow rounded-box w-52'>
                        <li><Link href={'/'}>Homepage</Link></li>
                        <li><a>Article of the Day</a></li>
                    </ul>
                </div>
                <Link href='/'>
                    <button className='ml-10 hover:text-blue-500 text-base-content text-3xl font-bold'>De-News!</button>
                </Link>
            </div>

            <SearchBar placeholder={"Search"} gun={props.gun.get('articles')} />

            <div className='navbar-end'>
                
                <select className="select" data-choose-theme>
                    <option disabled value="">Pick a theme</option>
                    <option value="">Default Value</option>
                    {themeValues.map((value) => (
                        <option key={value.toLowerCase()} value={value.toLowerCase()}>{value}</option>
                    ))}
                </select>
                
                


                <div className='dropdown dropdown-end ml-5'>
                    <label tabIndex={0} className='avatar'>
                        <CgProfile size={45} />
                    </label>

                    <ul tabIndex={0} className='menu bg-base-100 dropdown-content rounded-box w-48 mt-3 shadow-2xl'>
                        <li><Link href={'/profile'}>Profile</Link></li>
                        <li><Link href={'/login'}>Your Articles</Link></li>
                        <li><button onClick={handleLoginbtnClick}>{(props.loggedIn) ? 'Sign out' : 'Login'}</button></li>
                    </ul>
                </div>
            </div>


            <Link href={'/create_article'}>
                <button className='btn bg-base-100 border-base-200 text-sm ml-5 mr-20'>Post an article!</button>
            </Link>
        </nav>
    );


}


export default AppBar;

