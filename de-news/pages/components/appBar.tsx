import { IGun, IGunInstance, IGunUserInstance } from 'gun';
//require('gun/sea');
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import React, { Component } from 'react';
import { CgProfile } from 'react-icons/cg'
import { HiMenuAlt1 } from 'react-icons/hi'
import { checkLogin } from '../api/GunApi'

interface IProps {
    
}

interface IState {
    loggedIn: boolean
}




class AppBar extends Component<IProps, IState> {

    loggedIn: boolean
    constructor(props: IProps) {
        super(props);
        this.loggedIn = checkLogin(this.props.user);
        this.state = {
            loggedIn: this.loggedIn
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }

    

    componentDidMount(): void {
        this.setState({loggedIn: checkLogin(this.props.user)})
    }
    

    handleLogin = () => {
        Router.push('/login')
    }

    handleLogout = () => {
        this.props.user.leave();
        this.setState({loggedIn: checkLogin(this.props.user)})
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
                        <ul tabIndex={0} className='menu dropdown-content rounded-box w-32 mt-3 bg-gray-900'>
                            <li><button onClick={(this.state.loggedIn) ? this.handleLogout : this.handleLogin}>{(this.state.loggedIn) ? 'Sign out' : 'Login'}</button></li>
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

