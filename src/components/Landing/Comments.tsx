'use client'
import Image from "next/image";
import badge from "@/assets/images/Badge.svg";
import avatar1 from "@/assets/images/User.svg";
import avatar2 from "@/assets/images/User2.svg";
import avatar3 from "@/assets/images/User3.svg";
import avatar4 from "@/assets/images/User4.svg";
import discord from "@/assets/images/discord.svg";
import instagram from "@/assets/images/instagram.svg";
import x from "@/assets/images/x.svg";

export default function Comments() {

    type obgCard = {
        id : number ,
        name : string,
        job : string
        avatar : string,
        alt : string
        class : string
    }
    const Card : obgCard[] = [ 
                {
                    id : 1,
                    name : 'jhon',
                    job : 'Front End',
                    avatar : avatar1,
                    alt : 'avatar 1',
                    class : ''
                },
                {
                    id : 2,
                    name : 'arian',
                    job : 'Full stack',
                    avatar : avatar2,
                    alt : 'avatar 1',
                    class : 'translate-y-6'
                },
                {
                    id : 3,
                    name : 'Sarah',
                    job : 'Traider',
                    avatar : avatar3,
                    alt : 'avatar 1',
                    class : ''
                },
                {
                    id : 4,
                    name : 'Lilly',
                    job : 'SEO',
                    avatar : avatar4,
                    alt : 'avatar 1',
                    class : 'translate-y-6'
                },
    ]

    return(
        <section className="flex justify-center items-center flex-col">
            <Image className='mx-auto my-[15vh]' src={badge} alt='badge' width='50' height='50' />
            <h2 className='text-center mb-[5vh] text-4xl font-bold'>Meet <span className='bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text' >The Artist</span></h2>
            <div className="flex justify-center items-center gap-[10vh] w-full max-w-6xl px-4 my-[5vh] flex-wrap">
                {
                    Card.map((item , index) => (
                        <div key={index} className={`flex justify-center items-center flex-col gap-5 ${item.class}`}>
                            <div className="bg-stone-600 rounded-3xl border w-[60%] border-stone-100">
                                <Image className='p-2' src={item.avatar} alt={item.alt} width='200' height='200' />
                            </div>
                            <p className="text-xl font-bold">{item.name}</p>
                            <small className="font-light">{item.job}</small>
                            <div className="flex gap-3">
                                <Image className='' src={x} alt='x platform' width='15' height='15' />
                                <Image className='' src={discord} alt='x platform' width='15' height='15' />
                                <Image className='' src={instagram} alt='x platform' width='15' height='15' />
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}