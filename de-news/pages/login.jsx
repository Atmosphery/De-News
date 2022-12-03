import 'gun/sea';
import AppBar from "../components/appBar";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from 'react';






const Login = (props) => {
    const router = useRouter()

    const [wrongPasswordReact, setWrongPasswordReact] = useState(<div></div>);



    const login = async (event) => {
        event.preventDefault();

        let elements = event.currentTarget.elements;
        //elements.username.value
        await props.user.auth(elements.username.value, elements.password.value, (ack) => {
            if (ack.err) {
                setWrongPasswordReact(<p className='text-red-700'>Incorrect Password or Username!</p>)
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
        <main className="flex justify-center text-center">
            <div>
                <p className='mt-5 text-5xl'>Login</p>
                <div className="p-5 mt-10 w-96 bg-base-200 shadow-md rounded-2xl ">
                    <form onSubmit={login}>
                        <div>

                            <div className="mb-5">
                                <label className='text-2xl'>Username</label><br />
                                <input name="username" className='input input-bordered max-w-xs' />
                            </div>
                            <div>
                                <label className='text-2xl'>Password</label><br />
                                <input type='password' name="password" className='input input-bordered max-w-xs' />
                                {wrongPasswordReact}
                            </div>

                            <div>
                                <button className='btn mt-4 text-xl'>Login</button>
                            </div>
                            <div className="mt-5">
                                <Link href={'/signup'}><strong>Dont't have an account?</strong></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </main>





    )

}
export default Login;