import { Component, FormEvent, ReactNode } from "react";
import Gun from 'gun';
import 'gun/sea';
import { IGunInstance, IGunUserInstance, _GunRoot } from 'gun/types'
import AppBar from "../components/appBar";
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

const Login = (props: IGlobalState) => {
    const router = useRouter()
    let userNode: _GunRoot;

    const login = async (event: FormEvent<MyFormElement>) => {
        event.preventDefault();

        let elements = event.currentTarget.elements;
        //left of here/ adding data to user profile nodes
        await props.user.auth(elements.username.value, elements.password.value, (ack: any) => {
            console.log(ack);
            userNode = props.gun.user(window.sessionStorage.getItem(pair));
            Router.back()
        });
    }





    return (
        <main>
            <AppBar user={props.user} loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} />
            <div className="m-5">
                <form className="flex-row" onSubmit={login}>
                    <div>

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
                    <div className="mt-5">
                        <Link href={'/signup'}><a><strong>Dont't have an account?</strong></a></Link>
                    </div>
                </form>
            </div>
        </main>

    )

}
export default Login;