/* eslint-disable */
import React , {useState} from 'react';

function Register() {

    const [isLogin , setIsLogin] = useState(true)



    return (
        <>
            <div className='h-screen flex items-center justify-center bg-background font-Rubik'>
                <div className='w-[65vw] mx-auto h-[90vh] flex items-center justify-center'
                    style={{backgroundColor: (isLogin ? "#29274C" : "")}}>
                    <div className={` ${isLogin ? "w-[50%] h-[90%] rounded-2xl" : "flex-1 h-full"} bg-white flex items-center justify-start py-8 flex-col`}>
                        <h1 className='text-4xl font-Rubik font-bold self-start pl-8 text-primary'>Tasky</h1>
                        <h1 className='text-xl font-Rubik font-bold mt-24 text-primary'>{isLogin? "Welcome Back" :"Create Account"}</h1>
                        <div className='w-[80%] my-3'>
                            <h1>Name</h1>
                            <input type="text" className='mt-2 text-2xl bg-shadow px-3 py-2 rounded-lg w-full' placeholder='John Doe'/>
                        </div>
                        {
                        !isLogin?
                            <div className='w-[80%] my-3'>
                                <h1>Email</h1>
                                <input type="text" className='mt-2 text-2xl bg-shadow px-3 py-2 rounded-lg w-full' placeholder='John_Doe@john.com'/>
                            </div>
                        : ""
                        }
                        <div className='w-[80%] my-3'>
                            <h1>Password</h1>
                            <input type="password" className='mt-2 text-2xl bg-shadow px-3 py-2 rounded-lg w-full' placeholder='John_Doe@john.com'/>
                        </div>
                        <div className='bg-primary text-white w-[80%] text-center py-3 rounded-2xl font-bold my-5 hover:bg-secondry cursor-pointer transition-all'>
                            Sign-Up
                        </div>
                        <h1 className=' cursor-pointer text-primary hover:text-secondry transition-all'
                            onClick={e => setIsLogin(prev => !prev)}
                            >{isLogin ? "Register?" :"Have An Account"}</h1>
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