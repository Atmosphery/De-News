import { Component, FormEvent, ReactNode } from "react";
import Gun from 'gun/gun';
require('gun/sea');
import { GunCallbackGet, GunCallbackUserAuth, IGunInstance, IGunUserInstance } from 'gun/types'


const gun: IGunInstance = Gun('233.255.255.255:8765');

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement;
    password: HTMLInputElement;
}

interface MyFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

class Signup extends Component {

    user: IGunUserInstance
    constructor(props: any) {
        super(props);
        this.user = gun.user().recall({ sessionStorage: true });
    }

    signup = (event: FormEvent<MyFormElement>) => {
        event.preventDefault();
        let elements = event.currentTarget.elements;

        this.user.create(elements.username.value, elements.password.value, (ack: any) => {
            console.log(ack);
        });
        this.user.auth(elements.username.value, elements.password.value, (ack:any) => {
            if(ack.err === undefined){
                console.log('logged in successfully')
            }
        });
    }


    render(): ReactNode {
        return (
            <main>
                <div className="m-5">
                    <h1>Create an Account</h1>
                    <form onSubmit={this.signup}>
                        <div>
                            <label>Username</label><br />
                            <input name="username" className='border-2 border-style: solid border-black' />
                        </div>
                        <div>
                            <label>Password</label><br />
                            <input type='password' name="password" className='border-2 border-style: solid border-black' />
                        </div>
                        <div>
                            <button className='border-2 border-style: dotted border-black mt-3 p-1'>Sign Up</button>                        </div>
                    </form>
                </div>
            </main>

        )
    }
}
export default Signup;