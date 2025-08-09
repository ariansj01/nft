'use client'
import Image from "next/image";
import badge from "@/assets/images/Badge.svg";
import OkIcon from "@/assets/images/OkIcon.svg";

export default function Plans() {

    type obgCard = {
            id : number ,
            subTitle : string
            title : string,
            text : string,
            options : [
                {title : string},
                {title : string},
                {title : string},
            ]
    }
    const Card : obgCard[] = [ 
            {
                id : 1,
                subTitle : 'PHASE 1',
                title : 'Planing',
                text : 'Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.',
                options : [
                    {
                        title : 'test 1',
                    },
                    {
                        title : 'test 2',
                    },
                    {
                        title : 'test 3',
                    }
                ]
            },
            {
                id : 2,
                subTitle : 'PHASE 2',
                title : 'Planing',
                text : 'Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.',
                options : [
                    {
                        title : 'test 1',
                    },
                    {
                        title : 'test 2',
                    },
                    {
                        title : 'test 3',
                    }
                ]
            },
            {
                id : 3,
                subTitle : 'PHASE 3',
                title : 'Planing',
                text : 'Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.',
                options : [
                    {
                        title : 'test 1',
                    },
                    {
                        title : 'test 2',
                    },
                    {
                        title : 'test 3',
                    }
                ]
            },
            {
                id : 4,
                subTitle : 'PHASE 4',
                title : 'Planing',
                text : 'Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.',
                options : [
                    {
                        title : 'test 1',
                    },
                    {
                        title : 'test 2',
                    },
                    {
                        title : 'test 3',
                    }
                ]
            },
            {
                id : 5,
                subTitle : 'PHASE 5',
                title : 'Planing',
                text : 'Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.',
                options : [
                    {
                        title : 'test 1',
                    },
                    {
                        title : 'test 2',
                    },
                    {
                        title : 'test 3',
                    }
                ]
            },
            {
                id : 6,
                subTitle : 'PHASE 6',
                title : 'Planing',
                text : 'Quality comes first. we took our time to plan out everything and build our production pipeline for a good quality artworks.',
                options : [
                    {
                        title : 'test 1',
                    },
                    {
                        title : 'test 2',
                    },
                    {
                        title : 'test 3',
                    }
                ]
            },
            
    ]

    return(
        <section className="flex justify-center items-center flex-col">
            <Image className='mx-auto my-[15vh]' src={badge} alt='badge' width='50' height='50' />
            <h2 className='text-center mb-[5vh] text-4xl font-bold'>Nfthubs<span className='bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text' >Plans</span></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[5vh] w-full max-w-6xl px-4">
                {
                    Card.map((item , index) => (
                        <div key={index} className="flex justify-center items-start flex-col border-1 border-stone-500 rounded-2xl p-5">
                            <small className='font-bold bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text' >{item.subTitle}</small>
                            <p className="text-2xl my-2 font-bold">{item.title}</p>
                            <p className="font-light pr-3">{item.text}</p>
                            <span className="border-1 border-stone-500 w-[35%] my-3"></span>
                            {
                                item.options.map((opt, index) => (
                                    <div key={index} className="flex my-1">
                                        <Image className='mr-2' src={OkIcon} alt='OkIcon' width='18' height='18' />
                                        <span>{opt.title}</span>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </section>
    )
} 