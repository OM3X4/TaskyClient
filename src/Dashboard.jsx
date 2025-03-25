import { BiCheck } from "react-icons/bi";
/* eslint-disable */
import React , {useState , useEffect} from 'react';
import NewTask from "./Newtask"
import NewTopic from "./newTopic"

const getFormattedDate = () => {
    const options = { weekday: "long", day: "numeric", month: "long" };
    return new Date().toLocaleDateString("en-GB", options);
};

const topics = [
    {
        name: "Study",
        num: 12,
    },
    {
        name: "Sports",
        num: 9,
    },
    {
        name: "Projects",
        num: 3,
    }
]

const tasks = [
    {
        name: "Study Math",
        topic : "Study",
        expiry: "27/8/2026",
        status: false
    },
    {
        name: "Play BasketBall",
        topic : "Sports",
        expiry: "2/2/2026",
        status: false
    },
    {
        name: "Build A website",
        topic : "Projects",
        expiry: "22/5/2026",
        status: true
    },
]

function Dashboard() {

    const [today, setToday] = useState("");

    const [topic , setTopic] = useState(0)

    const [isNewTask , setIsNewTask] = useState(true)
    const [isNewTopic , setIsNewTopic] = useState(false)




    useEffect(() => {
        setToday(getFormattedDate());
    }, []);


    return (
    <>
        {isNewTask ? <NewTask exitFunc={setIsNewTask}/> : ""}
        {isNewTopic ? <NewTopic exitFunc={setIsNewTopic}/> : ""}
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
                            <div className='bg-background rounded-full text-white px-2 py-1'>{item.num}</div>
                        </div>
                    )
                })}
            </div>
            <div className="mt-10 flex items-center justify-center flex-col gap-6">
                {
                    tasks.map((item) => {
                        if(!(item.topic == topic || topic == 0)) {
                            console.log(item.name , topic)
                            return null;
                        }
                        return (
                            <div className="bg-white w-[80%] px-10 py-5 rounded-2xl" key={item.name}>
                                <div className="flex  items-center justify-between mx-10">
                                    <div>
                                        <h1 className="text-3xl text-primary font-bold">{item.name}</h1>
                                        <h1 className="text-background">{item.topic}</h1>
                                    </div>
                                    <div className=" rounded-sm border-2 border-black">
                                        {item.status ? <BiCheck className="text-green text-5xl"/> : <BiCheck className="text-green opacity-0 text-5xl hover:opacity-60 cursor-pointer duration-150"/>}
                                    </div>
                                </div>
                                <hr className="text-background my-3"/>
                                <h1 className="mx-10 text-background my-3">Expire: {item.expiry}</h1>
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