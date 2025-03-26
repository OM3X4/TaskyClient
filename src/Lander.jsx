/* eslint-disable */
import React from 'react';
import { Link } from 'react-router';

function Lander() {
    return (
    <>
        <div className='h-screen overflow-hidden'>
            <img src="lander.jpg" className='object-cover h-full w-full brightness-35 absolute -z-50' />
            <div className='my-8 mx-10 flex items-center justify-between'>
                <h1 className='text-6xl font-bold text-white font-Rubik'>Tasky</h1>
                <Link to={"/register"}>
                    <div className='bg-primary px-6 py-3 text-white font-Rubik font-bold rounded-2xl text-xl hover:bg-secondry cursor-pointer'>
                        Sign-Up
                    </div>
                </Link>
            </div>
            <div className='text-white font-Rubik text-9xl whitespace-pre-wrap font-bold my-30 mx-10'>
                Stay Organized.<br />
                Get Things Done.
            </div>

        </div>
    </>
    );
}

export default Lander;