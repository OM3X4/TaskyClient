/* eslint-disable */
import { BiCheck } from "react-icons/bi";
import React , {useState , useEffect} from 'react';
import NewTask from "./Newtask"
import NewTopic from "./newTopic"
import { isTokenExpired } from "./tokenChecker";
import { useNavigate } from "react-router";

const BackendURL = import.meta.env.VITE_BACKEND_URL

const getFormattedDate = () => {
    const options = { weekday: "long", day: "numeric", month: "long" };
    return new Date().toLocaleDateString("en-GB", options);
};




function Dashboard() {

    const Navigate = useNavigate()

    const [today, setToday] = useState("");

    const [topic , setTopic] = useState(0)

    const [tasks , setTasks] = useState([]);
    const [topics , setTopics] = useState([]);

    const [isNewTask , setIsNewTask] = useState(false)
    const [isNewTopic , setIsNewTopic] = useState(false)

    async function refreshTokenFunc(){
        console.log("Access token expired, refreshing...");

        const refreshToken = localStorage.getItem("refresh_token")

        const response = await fetch(`${BackendURL}/api/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "refresh":refreshToken }),
        });

        if (!response.ok) {
            localStorage.setItem("access_token" , null);
            localStorage.setItem("refresh_token" , null);
            console.error("Failed to refresh token. Logging out...");
            return null;
        }


        const data = await response.json();


        localStorage.setItem("access", data.access);
        return data.access;
    }

    async function fetchTasks(){
        let accessToken = localStorage.getItem("access_token")
        const refreshToken = localStorage.getItem("refresh_token")

        if(isTokenExpired(accessToken)){
            accessToken = await refreshTokenFunc();
        }

        const response = await fetch(`${BackendURL}/tasks` , {
            method: "GET",
            headers: {
                "Content-Type" : "application",
                "Authorization": `Bearer ${accessToken}`
            }
        })

        if(!response.ok){
            Navigate("/register")
            throw new Error(response.status);
        }

        const data = await response.json();

        setTasks(data)


    }
    async function fetchTopics(){
        let accessToken = localStorage.getItem("access_token")
        const refreshToken = localStorage.getItem("refresh_token")

        if(isTokenExpired(accessToken)){
            accessToken = refreshTokenFunc();
        }

        const response = await fetch(`${BackendURL}/topics` , {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })

        if(!response.ok){
            throw new Error(response.status)
        }

        const data = await response.json();

        setTopics(data)


    }

    async function toggleTask(id){
        let accessToken = localStorage.getItem("access_token")
        let refreshToken = localStorage.getItem("refresh_token")

        if(isTokenExpired(accessToken)){
            accessToken = await refreshTokenFunc();
        }

        const response = await fetch(`${BackendURL}/toggle/${id}/` , {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        })

        if(!response.ok){
            console.error("toggle error : " , response.status , response.statusText);
            return
        }

        const data = await response.json()

        setTasks(data);

    }

    function logout(){
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token" );
        Navigate("/");
    }

    useEffect(() => {
        setToday(getFormattedDate());
        fetchTasks()
        fetchTopics()
    } , [])




    return (
    <>
        {/* logout button */}
        <div className="absolute top-10 right-10 p-2 text-white font-bold cursor-pointer rounded-full bg-primary" onClick={logout}>
            Logout
        </div>


        {isNewTask ? <NewTask exitFunc={setIsNewTask} setTasks={setTasks} tokenRefresher={refreshTokenFunc} topics={topics}/> : ""}
        {isNewTopic ? <NewTopic exitFunc={setIsNewTopic} setTopics={setTopics} tokenrefresher={refreshTokenFunc}/> : ""}
        <div className={`min-h-screen bg-shadow `}>

            {/* The New Task Pop Up */}
            {isNewTask || isNewTopic && (
                <div className="fixed inset-0 bg-black opacity-50 z-10 h-full w-full"></div>
            )}

            <div className='mx-80 pt-20 flex items-center justify-between'>
                <div>
                    <h1 className='text-6xl font-bold font-Rubik text-primary'>Today's Tasks</h1>
                    <h1 className='text-background'>{today}</h1>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <div className='bg-primary text-4xl py-3 px-5 text-white rounded-2xl cursor-pointer hover:bg-secondry' onClick={e => setIsNewTask(true)}>+ New Task</div>
                    <div className='w-fit bg-primary text-xl py-1 px-3 text-white rounded-2xl cursor-pointer hover:bg-secondry ' onClick={e => setIsNewTopic(true)}>+ New Topic</div>
                </div>
            </div>
            <div className='mt-10 flex items-center justify-center gap-5'>
                <h1 onClick={e => setTopic(0)} className={`${topic == 0? "text-black" : "text-background"} text-xl cursor-pointer`}>All</h1>
                <div className='bg-background w-[2px] h-8'></div>
                {topics.map((item) => {
                    return (
                        <div className='flex items-center justify-center gap-3' onClick={e => setTopic(item.name)}>
                            <h1 className={`${topic == item.name ? "text-black" : "text-background"} cursor-pointer`}>{item.name}</h1>
                            <div className='bg-background rounded-full text-white px-2 py-1'>{tasks.filter(task => task.topic && task.topic.id == item.id).length}</div>
                        </div>
                    )
                })}
            </div>
            <div className="mt-10 flex items-center justify-center flex-col gap-6">
                {
                    tasks.map((item) => {
                        if(!((item.topic && item.topic.name == topic) || topic == 0)) {
                            return null;
                        }
                        return (
                            <div className="bg-white w-[80%] px-10 py-5 rounded-2xl" key={item.name}>
                                <div className="flex  items-center justify-between mx-10">
                                    <div>
                                        <h1 className="text-3xl text-primary font-bold">{item.name}</h1>
                                        <h1 className="text-background">{item.topic ? item.topic.name : "None"}</h1>
                                    </div>
                                    <div className=" rounded-sm border-2 border-black cursor-pointer" onClick={e => toggleTask(item.id)}>
                                        {item.status ? <BiCheck className="text-green text-5xl"/> : <BiCheck className="text-green opacity-0 text-5xl hover:opacity-60 cursor-pointer duration-150"/>}
                                    </div>
                                </div>
                                <hr className="text-background my-3"/>
                                <h1 className="mx-10 text-background my-3">Expire: {item.expire}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
    );
}


export default Dashboard;