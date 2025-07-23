'use client'
import Image from "next/image";
import NFT1 from '@/assets/images/NFT-1.svg'
import Countdown from "@/components/NFT_details/countDown";
import { useState } from "react";

export default function Details() {
    type TDetails = {
        id : number
        image : string
        title : string
        creator : string
        price : string
        likes : number
        creatorImage : string
        tags : string[]
        description : string
        createAt : string
        timer : string
        isLiked: boolean
    }
    const [details, setDetails] = useState<TDetails[]>([
        {
            id : 1,
            image : NFT1,
            title : 'Designer Bear',
            creator : 'mr fox',
            price : '0.2ETH',
            likes : 230,
            creatorImage : NFT1,
            tags : ['Art', 'Collectible', 'Digital Art'],
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
            createAt : '2021-01-01',
            timer : '12:00:00',
            isLiked: false
        }
    ]);

    const handleLike = (id: number) => {
        setDetails(prevDetails => 
            prevDetails.map(detail => 
                detail.id === id ? { 
                    ...detail, 
                    likes: detail.isLiked ? detail.likes - 1 : detail.likes + 1,
                    isLiked: !detail.isLiked 
                } : detail
            )
        );
    };

    // Convert timer string to target time
    const getTargetTime = (timer: string) => {
        const [hours, minutes, seconds] = timer.split(':').map(Number);
        const now = new Date();
        const target = new Date(now);
        target.setHours(now.getHours() + hours);
        target.setMinutes(now.getMinutes() + minutes);
        target.setSeconds(now.getSeconds() + seconds);
        return target.getTime();
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mt-10 gap-5">
            {details.map((detail) => (
                <div key={detail.id} className="flex flex-col items-center justify-center w-full gap-5">
                    <Image src={detail.image} alt='nft_image' className="w-full h-[40vh]" width={100} height={100} />
                    <div className="flex items-center justify-between gap-3 w-[80%]">
            <div className="flex flex-col items-start justify-center gap-3">
                            <div className="flex flex-col items-start justify-center gap-5">
                                <div className="">
                                    <h2 className="text-3xl my-2 font-bold">{detail.title}</h2>
                                    <small className="text-sm text-gray-500">{detail.createAt}</small>
                                    <div className="flex items-center justify-start gap-2 mt-3">
                                        <Image src={detail.creatorImage} alt='nft_image' className="rounded-full" width={20} height={20} />
                                        <p>{detail.creator}</p>
                                    </div>
                                </div>
                                <p className="text-3xl font-bold bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text">Price : {detail.price}</p>
                                <div className="">
                                    <h2 className="text-3xl my-2 font-bold">Description</h2>
                                    <small className="text-sm text-gray-500">{detail.description}</small>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        className="flex items-center gap-1 transition-colors"
                                        onClick={() => handleLike(detail.id)}
                                    >
                                        <svg 
                                            className={`w-6 h-6 transition-colors ${detail.isLiked ? 'fill-red-500 text-red-500' : 'hover:fill-red-500 hover:text-red-500'}`}
                                            fill={detail.isLiked ? "currentColor" : "none"}
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                                            />
                                        </svg>
                                        <span className="font-medium">{detail.likes} likes</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    {detail.tags.map((tag) => (
                                        <p key={tag} className="text-sm bg-opacity-20 backdrop-blur-sm bg-white/30 px-2 py-1 rounded-md text-gray-300">{tag}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Countdown 
                            targetTime={getTargetTime(detail.timer)}
                            onComplete={() => console.log('Auction ended!')}
                        />
                    </div>
            </div>
            ))}
        </div>
    );
}
