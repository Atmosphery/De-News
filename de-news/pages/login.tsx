import { Component, FormEvent, ReactNode } from "react";
import Gun from 'gun';
import 'gun/sea';
import { IGunInstance, IGunUserInstance } from 'gun/types'
import AppBar from "./components/appBar";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { IGlobalState } from "./objects";




interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

interface MyFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

const Login = ({ gun, user, setUser }: IGlobalState) => {
    const router = useRouter()

    const login = async (event: FormEvent<MyFormElement>)  => {
        event.preventDefault();

        let elements = event.currentTarget.elements;
        
        setUser(await user.auth(elements.username.value, elements.password.value, (ack: any) => {
            console.log(ack);
        }));
        //Router.reload();
        router.push('/')
        
    }





    return (
        <main>
            <div className="m-5">
                <form onSubmit={login}>
                    <div>
                        <Link href={'/'}><button className="btn">Home</button></Link>
                        <label>Username</label><br />
                        <input name="username" className='input input-bordered max-w-xs' />
                    </div>
                    <div>
                        <label>Password</label><br />
                        <input type='password' name="password" className='input input-bordered max-w-xs' />
                    </div>
                    <div>
                        <button className='btn mt-4'>Login</button>
                    </div>
                </form>
            </div>
        </main>

    )

}
export default Login;