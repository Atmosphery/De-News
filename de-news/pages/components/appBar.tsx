import { IGun, IGunInstance, IGunUserInstance } from 'gun';
//require('gun/sea');
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import React, { Component, Dispatch, SetStateAction } from 'react';
import { CgProfile } from 'react-icons/cg'
import { HiMenuAlt1 } from 'react-icons/hi'
import { IGlobalState } from '../objects';
import Gun from 'gun'

interface IProps {
    user: IGunUserInstance
    loggedIn: boolean
    setLoggedIn: Dispatch<SetStateAction<boolean>>
}





class AppBar extends Component<IProps> {



    constructor(props: any) {
        super(props);

        this.props.setLoggedIn(this.checkLogin());

        this.checkLogin = this.checkLogin.bind(this)
        this.Login = this.Login.bind(this);
        this.Logout = this.Logout.bind(this);

    }

    checkLogin = (): boolean => {
        //let user = gun.user();
        if (this.props.user.is) {
            console.log('You are logged in');
            return true
        } else {
            console.log('You are not logged in');
            return false
        }
    }


    componentDidMount(): void {
        this.props.user.recall({ sessionStorage: true })
    }

    handleLoginbtnClick = () => {
        if (this.checkLogin()) {
            this.Logout()
        } else {
            this.Login()
        }
    }

    Login = () => {
        Router.push('/login')
    }

    Logout = () => {
        this.props.user.leave();
        this.props.setLoggedIn(this.checkLogin());
    }


    render() {
        return (

            <div className='navbar bg-gray-900'>
                <div className='navbar-start'>
                    <div className='dropdown'>
                        <label tabIndex={0} className='btn btn-ghost btn-circle'>
                            <HiMenuAlt1 size={25} />
                        </label>
                        <ul tabIndex={0} className='menu dropdown-content mt-3 p-3 shadow bg-gray-900 rounded-box w-52'>
                            <li><Link href={'/'}>Homepage</Link></li>
                            <li><a>Article of the Day</a></li>
                        </ul>
                    </div>
                    <Link href='/'>
                        <button className='ml-3 hover:text-blue-500 text-3xl font-bold'>De-News!</button>
                    </Link>
                </div>



                <div className='navbar-end'>
                    <div className='dropdown'>
                        <label tabIndex={0} className='btn btn-circle btn-ghost'>
                            <CgProfile size={35} />
                        </label>
                        <ul tabIndex={0} className='menu dropdown-content rounded-box w-48 mt-3 bg-gray-900'>
                            <li><button onClick={this.handleLoginbtnClick}>Login/Sign out</button></li>
                            <li><Link href={'/login'}>Profile</Link></li>
                            <li><Link href={'/login'}>Your Articles</Link></li>
                        </ul>

                    </div>
                    <Link href={'/create_article'}>
                        <button className='btn bg-gray-700 ml-5 text-sm'>Post an article!</button>
                    </Link>
                </div>
            </div>
        );
    }


}


export default AppBar;

