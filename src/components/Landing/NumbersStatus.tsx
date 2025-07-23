'use client'
import badge from "@/assets/images/Badge.svg";
import Image from "next/image";


export default function NumberStatus () {
    type obgCard = {
        id : number ,
        title : string,
        text : string,
        class : string
    }
    const Card : obgCard[] = [ 
        {
            id : 1,
            title : '400K',
            text : 'wallet Connect',
            class : 'border-r-2 border-stone-800 '
        },
        {
            id : 2,
            title : '20K',
            text : 'wallet Connect',
            class : 'border-r-2 border-stone-800 '
        },
        {
            id : 3,
            title : '230+',
            text : 'wallet Connect',
            class : 'border-r-2 border-stone-800 '
        },
        {
            id : 4,
            title : '2.5x',
            text : 'wallet Connect',
            class : ''
        },
        
    ]
    return (
        <section className="flex justify-center items-center flex-col gap-5">
            <Image className='mx-auto my-[15vh]' src={badge} alt='badge' width='50' height='50' />
            <div className="grid grid-cols-4 gap-[10vh] ">
                {
                    Card.map((item , index) => (
                    <div key={index} className={`flex justify-center items-center flex-col pr-5 ${item.class}`}>
                        <h3 className="font-bold text-5xl">{item.title}</h3>
                        <small className="mt-5">{item.text}</small>
                    </div>  
                    ))
                }
            </div>
        </section>
    )
}