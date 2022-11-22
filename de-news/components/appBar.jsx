//require('gun/sea');
import Link from 'next/link';
import Router from 'next/router';
import React, { Component } from 'react';
import { CgProfile } from 'react-icons/cg'
import { HiMenuAlt1 } from 'react-icons/hi'
import { themeChange } from 'theme-change'
import { useEffect } from 'react'





const AppBar = (props) => {




    const themeValues = [
        "cupcake",
        "forest",
        "Aqua",
        "light",

    ]

    useEffect(() => {
        themeChange(false);
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
        Router.push('/login')
    }

    const Logout = () => {
        props.user.leave();
        props.setLoggedIn(checkLogin());
        sessionStorage.setItem('currentUsername', '')
        Router.push('/');
    }
    props.setLoggedIn(checkLogin());


    return (

        <nav className='sticky top-0 navbar z-10 shadow-xl bg-base-100 bg-opacity-95'>
            <div className='navbar-start'>
                <div className='dropdown'>
                    <label tabIndex={0} className='btn btn-circle'>
                        <HiMenuAlt1 size={25} />
                    </label>
                    <ul tabIndex={0} className='menu dropdown-content mt-3 p-3 shadow rounded-box w-52'>
                        <li><Link href={'/'}>Homepage</Link></li>
                        <li><a>Article of the Day</a></li>
                    </ul>
                </div>
                <Link href='/'>
                    <button className='ml-3 hover:text-blue-500 text-base-content text-3xl font-bold'>De-News!</button>
                </Link>
            </div>


            <div className='navbar-end'>
                
                <select className="select" data-choose-theme>
                    <option disabled value="">Pick a theme</option>
                    <option option value="">Default Value</option>
                    {themeValues.map((value) => (
                        <option key={value.toLowerCase()} value={value.toLowerCase()}>{value}</option>
                    ))}
                </select>
                <div className="form-control ml-5">
                    <input type="text" placeholder="Search" className="input input-bordered" />
                </div>

                <div className='dropdown dropdown-end ml-5'>
                    <label tabIndex={0} className='avatar'>
                        <CgProfile size={45} />
                    </label>

                    <ul tabIndex={0} className='menu  bg-base-100 dropdown-content rounded-box w-48 mt-3 shadow-2xl'>
                        <li><Link href={'/profile'}>Profile</Link></li>
                        <li><Link href={'/login'}>Your Articles</Link></li>
                        <li><button onClick={handleLoginbtnClick}>{(props.loggedIn) ? 'Sign out' : 'Login'}</button></li>
                    </ul>
                </div>
            </div>


            <Link href={'/create_article'}>
                <button className='btn text-sm ml-5 mr-5'>Post an article!</button>
            </Link>
        </nav>
    );


}


export default AppBar;

