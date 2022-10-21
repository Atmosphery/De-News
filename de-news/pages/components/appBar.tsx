import { IGun, IGunInstance, IGunUserInstance } from 'gun';
//require('gun/sea');
import Image from 'next/image';
import Link from 'next/link';
import React, { Component } from 'react';
import { CgProfile } from 'react-icons/cg'
import { HiMenuAlt1 } from 'react-icons/hi'

interface IProps {
    title: string,
    user: IGunUserInstance
}




class AppBar extends Component<IProps> {
    
   
    constructor(props: IProps) {
        super(props);
    }

    checkLogin = (user: IGunUserInstance): string => {
        //let user = gun.user();
        if (user.is) {
            return 'login'
        }
        return 'signup'
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

                <div className='navbar-center text-2xl'>{this.props.title}</div>

                <div className='navbar-end'>
                    <div className='dropdown'>
                        <label tabIndex={0} className='btn btn-circle btn-ghost'>
                            <CgProfile size={35} />
                        </label>
                        <ul tabIndex={0} className='menu dropdown-content rounded-box w-32 mt-3 bg-gray-900'>
                            <li><Link href={`/${this.checkLogin(this.props.user)}`}>{this.checkLogin(this.props.user)}</Link></li>
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

