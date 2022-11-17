import { Component } from "react";
import 'gun/sea';
import AppBar from "../components/appBar";
import Link from "next/link";
import Router from "next/router";






class Signup extends Component {
    
    constructor(props) {
        super(props);
    }

    signup = (event) => {
        event.preventDefault();
        let elements = event.currentTarget.elements;

        this.props.gun.user().create(elements.username.value, elements.password.value, (ack) => {
            console.log(ack);
        });
        this.props.user.auth(elements.username.value, elements.password.value, (ack) => {
            if (ack.err === undefined) {
                console.log('logged in successfully')
            }
        });
        Router.back();
    }


    render() {
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
                        <Link href={'/login'}><strong>Already have an account?</strong></Link>
                    </div>
                </form>
            </div>
        </main>

        )
    }
}
export default Signup;