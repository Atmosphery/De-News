import { Component, FormEvent, ReactNode } from "react";
import Gun from 'gun/gun';
require('gun/sea');
import { IGunInstance, IGunUserInstance } from 'gun/types'


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
    }


    render(): ReactNode {
        return (
            <main>
                <div className="m-5">
                    <form onSubmit={this.login}>
                        <div>
                            <label>Username</label><br />
                            <input name="username" className='border-2 border-style: solid border-black' />
                        </div>
                        <div>
                            <label>Password</label><br />
                            <input type='password' name="password" className='border-2 border-style: solid border-black' />
                        </div>
                        <div>
                            <button className='border-2 border-style: dotted border-black mt-3 p-1'>Login</button>                        </div>
                    </form>
                </div>
            </main>

        )
    }
}
export default Login;