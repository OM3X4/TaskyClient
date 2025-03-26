import { FaTimes } from "react-icons/fa";
/* eslint-disable */
import React , {useState , useEffect} from 'react';
import Alert from './errorMessage.jsx';
import { isTokenExpired } from "./tokenChecker.js";

const BackendURL = import.meta.env.VITE_BACKEND_URL


function NewTopic({exitFunc , setTopics , tokenrefresher}) {

    const [newTopicName , setNewTopicName] = useState(null)


    const [errorName , setErrorName] = useState(false)


    async function create(){
        if(newTopicName == null || newTopicName.length == 0){
            setErrorName(true);
            setTimeout(() => {
                setErrorName(false)
            } , 1000)
            return;
        }

        let access_token = localStorage.getItem("access_token");
        let refresh_token = localStorage.getItem("refresh_token");

        if(isTokenExpired(access_token)){
            access_token = tokenrefresher();
            localStorage.setItem("access_token" , access_token);
        }

        const response = await fetch(`${BackendURL}/topics/` , {
            method: "POST" ,
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify({name: newTopicName})
        })

        if(!response.ok){
            console.error("error creating : " , response.status)
            return;
        }


        const data = await response.json();

        setTopics(data)

        exitFunc(false)

    }






    return (
    <>
        {errorName ? <Alert message={"Provide A Valid Name"}/> : ""}



        <div className="fixed inset-0 flex items-center justify-center z-20 overflow-hidden">

            {/* close icon */}
            <div className="relative">
                <button onClick={e => exitFunc(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-2 cursor-pointer">
                    <FaTimes size={24} />
                </button>

                <div className="bg-white w-[40vw] h-[50vh] p-6 rounded-2xl shadow-lg py-5">
                    <h1 className='text-4xl font-bold text-primary text-center mt-5'>New Topic</h1>
                    <div className='flex items- justify-between mt-10 mx-10'>
                        <div className='my-10'>
                            <h1>Name</h1>
                            <input type="text" className='bg-shadow placeholder:text-background placeholder:italic py-1 px-3 rounded-xl w-[30vw] text-3xl'
                                    placeholder='Study... ' onChange={e => setNewTopicName(e.target.value)}/>
                        </div>
                    </div>
                    <div className='w-full bg-primary text-white text-2xl text-center font-bold py-2 my-3 rounded-3xl hover:bg-secondry cursor-pointer'
                        onClick={create}>
                        Create
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default NewTopic;