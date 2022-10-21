import { Component, FormEvent, ReactNode } from "react";
import Gun from 'gun/gun';
require('gun/sea');
import { IGunInstance, IGunUserInstance } from 'gun/types'
import AppBar from "./components/appBar";


const gun: IGunInstance = Gun('233.255.255.255:8765');

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

interface MyFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

class Login extends Component {

    user: IGunUserInstance
    constructor(props: any) {
        super(props);
        this.user = gun.user().recall({ sessionStorage: true });
    }

    login = (event: FormEvent<MyFormElement>) => {
        event.preventDefault();

        let elements = event.currentTarget.elements;
        this.user.auth(elements.username.value, elements.password.value, (ack: any) => {
            console.log(ack);
        });

        if (this.user.is) {
            console.log('You are logged in');
        } else {
            console.log('You are not logged in');
        }
    }


    render(): ReactNode {
        return (
            <main>
                <AppBar title='Login' />
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
                            <button className='btn mt-4'>Login</button>                        </div>
                    </form>
                </div>
            </main>

        )
    }
}
export default Login;