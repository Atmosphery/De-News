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
            <main className="flex justify-center text-center">
                <div>
                    <p className='mt-5 text-5xl'>Sign Up</p>
                    <div className="p-5 mt-10 w-96 bg-base-200 shadow-md rounded-2xl border border-transparent">
                        <form onSubmit={this.signup}>
                            <div>
                                <div className="mb-5">
                                    <label className="text-2xl">Username</label><br />
                                    <input name="username" className='input input-bordered max-w-xs' />
                                </div>
                                <div>
                                    <label className="text-2xl">Password</label><br />
                                    <input type='password' name="password" className='input input-bordered max-w-xs' />
                                </div>
                                <div>
                                    <button className='btn mt-4 text-xl'>Sign up</button>
                                </div>
                                <div className="mt-5">
                                    <Link href={'/login'}><strong>Already have an account?</strong></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </main>

        )
    }
}
export default Signup;