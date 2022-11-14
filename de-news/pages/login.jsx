import 'gun/sea';
import AppBar from "../components/appBar";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from 'react';






const Login = (props) => {
    const router = useRouter()

    const [wrongPasswordReact, setWrongPasswordReact] = useState(<div></div>);

    

    const login = async(event) => {
        event.preventDefault();

        let elements = event.currentTarget.elements;

        await props.user.auth(elements.username.value, elements.password.value, (ack) => {
            if (ack.err) {
                setWrongPasswordReact(<h2 className='text-red-700'>Incorrect Password or Username!</h2>)
                console.log('wrong password')
            } else {
                props.setLoggedIn(true);
                sessionStorage.setItem('currentUsername', elements.username.value);
                router.back();
            }
            //console.log(ack);

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
                    {wrongPasswordReact}
                    <div>
                        <button className='btn mt-4'>Login</button>
                    </div>
                    <div className="mt-5">
                        <Link href={'/signup'}><strong>Dont't have an account?</strong></Link>
                    </div>
                </form>
            </div>
        </main>

    )

}
export default Login;