//require('gun/sea');
import Link from 'next/link';

import React, { Component } from 'react';
import { CgProfile } from 'react-icons/cg'
import { HiMenuAlt1 } from 'react-icons/hi'
import { themeChange } from 'theme-change'
import { useEffect } from 'react'
import SearchBar from './SearchBar';
import { useState } from 'react';
import { useRouter } from 'next/router'






const AppBar = (props) => {

    const router = useRouter();

    const themeValues = [
        "Cupcake",
        "Forest",
        "Aqua",
        "Black",
        "Luxury",
        "Halloween",
        "Night"
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

        <nav className='sticky top-0 navbar inline-flex z-10 shadow-xl bg-base-300 bg-opacity-95'>
            <div className='navbar-start'>

                <Link href='/'>
                    <button className='ml-10 hover:text-blue-500 text-base-content text-3xl font-bold'>De-News!</button>
                </Link>
            </div>
            <div className='navbar-center'>
                <SearchBar placeholder={"Search"} gun={props.gun.get('articles')} />
            </div>

            <div className='navbar-end'>

                <select className="select" data-choose-theme>
                    <option disabled value="">Pick a theme</option>
                    <option value="">Default Theme</option>
                    {themeValues.map((value) => (
                        <option key={value.toLowerCase()} value={value.toLowerCase()}>{value}</option>
                    ))}
                </select>




                <div className='dropdown dropdown-end ml-5'>
                    <label tabIndex={0} className='avatar'>
                        <CgProfile size={45} />
                    </label>

                    <ul tabIndex={0} className='menu bg-base-200 dropdown-content rounded-box w-48 mt-3 shadow-2xl'>
                        <li ><Link href={'/profile'}>Profile</Link></li>
                        {(!props.loggedIn) ?
                            <li className='bg-base-200'><Link href={'/login'}><button>Login</button></Link></li> :
                            <li className='bg-base-200'><button onClick={Logout}>Sign Out</button></li>
                        }

                        {(!props.loggedIn) ?
                            <li><Link href={'/signup'}><button onClick={handleLoginbtnClick}>Sign Up</button></Link></li> :
                            <></>
                        }
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

