/* eslint-disable */
import { FaTimes } from "react-icons/fa";
import React , {useState , useEffect} from 'react';
import DropDown from './dropDown.jsx'
import Alert from './errorMessage.jsx';
import { isTokenExpired } from "./tokenChecker.js";

const BackendURL = import.meta.env.VITE_BACKEND_URL


function NewTask({exitFunc , setTasks , tokenRefresher , topics}) {

    const [newTaskTopic , setNewTaskTopic] = useState(null)
    const [newTaskName , setNewTaskName] = useState(null)
    const [newTaskDate , setNewTaskDate] = useState(null)

    const [errorName , setErrorName] = useState(false)
    const [errorDate , setErrorDate] = useState(false)


    async function create(){
        if(newTaskName == null || newTaskName.length == 0){
            setErrorName(true);
            setTimeout(() => {
                setErrorName(false)
            } , 1000)
            return
        }
        else if(newTaskDate == null || newTaskDate.length == 0){
            setErrorDate(true);
            setTimeout(() => {
                setErrorDate(false)
            } , 1000)
            return
        }

        let access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");

        if(isTokenExpired(access_token)){
            access_token = await tokenRefresher()
        }

        let body = {name: newTaskName , expire:newTaskDate};
        if(newTaskTopic){
            body.topic_id = newTaskTopic;
        }


        const response = await fetch(`${BackendURL}/tasks/` , {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${access_token}`
            },
            body: JSON.stringify(body)
        })

        if(!response.ok){
            console.error("error creating a new task" , response.status);
        }

        const data = await response.json()

        setTasks(data);
        exitFunc(false);
    }




    return (
    <>
        {errorName ? <Alert message={"Provide A Valid Name"}/> : ""}
        {errorDate ? <Alert message={"Provide A Valid Date"}/> : ""}


        <div className="fixed inset-0 flex items-center justify-center z-20 overflow-hidden">

            {/* relative div for absolute children */}
            <div className='relative'>

                {/* Exit Icon */}
                <button onClick={e => exitFunc(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-2 cursor-pointer">
                    <FaTimes size={24} />
                </button>

                <div className="bg-white w-[60vw] h-[80vh] p-6 rounded-2xl shadow-lg py-5">
                    <h1 className='text-4xl font-bold text-primary text-center mt-5'>New Task</h1>
                    <div className='flex items- justify-between mt-10 mx-10'>
                        <div className='mt-15'>
                            <div>
                                <h1>Name</h1>
                                <input type="text" className='bg-shadow placeholder:text-background placeholder:italic py-1 px-3 rounded-xl'
                                        placeholder='Play BasketBall ' onChange={e => setNewTaskName(e.target.value)}/>
                            </div>
                            <div className='flex items-center justify-between my-5'>
                                <h1>Topic</h1>
                                <div>
                                    <DropDown options={topics} setChoice={setNewTaskTopic}/>
                                </div>
                            </div>
                            <div className='flex items-center justify-center gap-6 my-5'>
                                <h1 className='text-sm'>Expire Date : </h1>
                                <div>
                                    <input type="date" className='bg-shadow px-2 py-1 rounded-2xl' onChange={e => setNewTaskDate(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <img src="newtask2.png" className='max-h-90 object-cover'/>
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

export default NewTask;