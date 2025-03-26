/* eslint-disable */
import React , {useState} from 'react';
import GoogleLoginButton from './GoogleLogin';
import { useNavigate } from 'react-router';

const BackendURL = import.meta.env.VITE_BACKEND_URL


function Register() {

    const Navigate = useNavigate()

    const [isLogin , setIsLogin] = useState(true)

    const [username , setUsername] = useState(null)
    const [password , setPassword] = useState(null)
    const [email , setEmail] = useState(null)

    function handleLoginSuccess(){
        Navigate("/dashboard")
    }

    async function loginWithCredentials(){
        if(isLogin){

            if(!username || !username.length){
                console.error("Write The User Name Please");
                return
            }
            if(!password || !password.length){
                console.error("Write The Password Please");
                return
            }

            const response = await fetch(`${BackendURL}/api/token/` ,{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({ username:username , password:password})
            });

            if(!response.ok){
                throw new Error("Login failed");
            }

            const data = await response.json();

            console.log("login successfully");

            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);

            Navigate("/dashboard");

        }
        else{

            if(!username || !username.length){
                console.error("Write The User Name Please");
                return
            }
            if(!password || !password.length){
                console.error("Write The Password Please");
                return
            }
            if(!email || !email.length){
                console.error("Write The Password Please");
                return
            }

            const response = await fetch(`${BackendURL}/register/` , {
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({username:username , email:email, password:password})
            })

            if(!response.ok){
                throw new Error("Error Regesitering")
            }

            const data = await response.json()

            console.log("sign up successfully" , data)

            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);

            Navigate("/dashboard");

        }
    }



    return (
        <>
            <div className='h-screen flex items-center justify-center bg-background font-Rubik'>
                <div className='w-[65vw] mx-auto h-[90vh] flex items-center justify-center'
                    style={{backgroundColor: (isLogin ? "#29274C" : "")}}>
                    <div className={` ${isLogin ? "w-[50%] h-[90%] rounded-2xl" : "flex-1 h-full"} bg-white flex items-center justify-start py-8 flex-col`}>
                        <h1 className='text-4xl font-Rubik font-bold self-start pl-8 text-primary'>Tasky</h1>
                        <h1 className='text-xl font-Rubik font-bold mt-20 text-primary'>{isLogin? "Welcome Back" :"Create Account"}</h1>
                        <div className='w-[80%] my-3'>
                            <h1>Name</h1>
                            <input type="text" className='mt-2 text-2xl bg-shadow px-3 py-2 rounded-lg w-full placeholder:italic' placeholder='John Doe'  onChange={e => setUsername(e.target.value)}/>
                        </div>
                        {
                        !isLogin?
                            <div className='w-[80%] my-3'>
                                <h1>Email</h1>
                                <input type="text" className='mt-2 text-2xl bg-shadow px-3 py-2 rounded-lg w-full placeholder:italic' placeholder='John_Doe@john.com' onChange={e => setEmail(e.target.value)}/>
                            </div>
                        : ""
                        }
                        <div className='w-[80%] my-3'>
                            <h1>Password</h1>
                            <input type="password" className='mt-2 text-2xl bg-shadow px-3 py-2 rounded-lg w-full placeholder:italic' placeholder='Tasky123...'  onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className='bg-primary text-white w-[80%] text-center py-3 rounded-2xl font-bold my-5 hover:bg-secondry cursor-pointer transition-all'
                        onClick={loginWithCredentials}>
                            {isLogin ? "Login" : "Signup"}
                        </div>
                        <h1 className=' cursor-pointer text-primary hover:text-secondry transition-all'
                            onClick={e => setIsLogin(prev => !prev)}
                            >{isLogin ? "Register?" :"Have An Account"}
                        </h1>
                        <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
                    </div>
                    {
                        !isLogin ?
                    <div className='h-full flex-1 bg-primary flex items-center justify-center text-9xl text-center text-white'>
                        Simple ToDo List
                    </div>
                        : ""
                    }
                </div>
            </div>
        </>
    );
}

export default Register;