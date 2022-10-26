import { Component, FormEvent, ReactNode } from "react";
import Gun from 'gun';
import 'gun/sea';
import { GunCallbackGet, GunCallbackUserAuth, IGunInstance, IGunUserInstance } from 'gun/types'
import AppBar from "../components/appBar";
import { IGlobalState } from "./objects";
import { userAgent } from "next/server";
import Link from "next/link";
import Router from "next/router";




interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

interface MyFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

class Signup extends Component<IGlobalState> {
    
    constructor(props: any) {
        super(props);
    }

    signup = (event: FormEvent<MyFormElement>) => {
        event.preventDefault();
        let elements = event.currentTarget.elements;

        this.props.user.create(elements.username.value, elements.password.value, (ack: any) => {
            console.log(ack);
        });
        this.props.user.auth(elements.username.value, elements.password.value, (ack: any) => {
            if (ack.err === undefined) {
                console.log('logged in successfully')
            }
        });
        Router.back();
    }


    render(): ReactNode {
        return (
            <main>
            <AppBar user={this.props.user} loggedIn={this.props.loggedIn} setLoggedIn={this.props.setLoggedIn} />
            <div className="m-5">
                <form className="flex-row" onSubmit={this.signup}>
                    <div>

                        <label>Username</label><br />
                        <input name="username" className='input input-bordered max-w-xs' />
                    </div>
                    <div>
                        <label>Password</label><br />
                        <input type='password' name="password" className='input input-bordered max-w-xs' />
                    </div>
                    <div>
                        <button className='btn mt-4'>Sign up</button>
                    </div>
                    <div className="mt-5">
                        <Link href={'/signup'}><a><strong>Already have an account?</strong></a></Link>
                    </div>
                </form>
            </div>
        </main>

        )
    }
}
export default Signup;