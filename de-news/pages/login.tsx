import { Component, FormEvent, ReactNode } from "react";
import Gun from 'gun';
import 'gun/sea';
import { IGunInstance, IGunUserInstance } from 'gun/types'
import AppBar from "./components/appBar";
import Router from "next/router";




interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

interface MyFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

class Login extends Component {
    gun: IGunInstance;
    user: IGunUserInstance;
    constructor(props: any) {
        super(props);
        this.gun = Gun(process.env.db_dev)
        this.user = this.gun.user()
    }

    login = (event: FormEvent<MyFormElement>) => {
        event.preventDefault();

        let elements = event.currentTarget.elements;
        this.user.auth(elements.username.value, elements.password.value, (ack: any) => {
            console.log(ack);

        });
        Router.push('/')
    }




    render(): ReactNode {
        return (
            <main>
                <AppBar title='Login' user={this.user} />
                <div className="m-5">
                    <form onSubmit={this.login}>
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
                    </form>
                </div>
            </main>

        )
    }
}
export default Login;