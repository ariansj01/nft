'use client'
import badge from "@/assets/images/Badge.svg";
import Image from "next/image";
import Image1 from '@/assets/images/Vector.svg'
import Image3 from '@/assets/images/Vector2.svg'
import Image2 from '@/assets/images/Vector3.svg'
import Link from "next/link";
export default function RoadMap() {

    type obgCard = {
        id : number ,
        img : string,
        alt : string,
        subTitle : string
        title : string,
        text : string,
        buttonText : string,
        buttonLink : string,
        RTL : boolean
    }
    const Card : obgCard[] = [ 
        {
            id : 1,
            img : Image1,
            alt : 'Step 1',
            subTitle : '01.',
            title : 'Setup and connect your wallet.',
            text : 'Use Trust Wallet, Metamask or any wallet to connect to multiple chains the app. Lorem ipsum dolor sit amet consectetur adipisicing elit Metamask or any wallet ipsam temporibus.',
            buttonText : 'Learn more',
            buttonLink : '/Learn',
            RTL : false
        },
        {
            id : 2,
            img : Image2,
            alt : 'Step 2',
            subTitle : '02.',
            title : 'Create your own digital artwork',
            text : 'Use Trust Wallet, Metamask or any wallet to connect to multiple chains the app. Lorem ipsum dolor sit amet consectetur adipisicing elit Metamask or any wallet ipsam temporibus.',
            buttonText : 'Learn more',
            buttonLink : '/Learn',
            RTL : true
        },
        {
            id : 3,
            img : Image3,
            alt : 'Step 3',
            subTitle : '03.',
            title : 'Choose a platform to sell your NFT',
            text : 'Use Trust Wallet, Metamask or any wallet to connect to multiple chains the app. Lorem ipsum dolor sit amet consectetur adipisicing elit Metamask or any wallet ipsam temporibus.',
            buttonText : 'Learn more',
            buttonLink : '/Learn',
            RTL : false
        },
    ]

    return(
        <section className="flex justify-center items-center flex-col">
            <Image className='mx-auto my-[15vh]' src={badge} alt='badge' width='50' height='50' />
            <h2 className='text-center mb-[5vh] text-4xl font-bold'>How it <span className='bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text' >works!</span></h2>
            <div className="flex justify-center items-center flex-col gap-[10vh] w-full max-w-5xl px-4">
                {
                    Card.map((item , index) => (
                        <div key={index} className={`flex flex-col md:flex-row ${item.RTL ? 'md:flex-row-reverse' : ''} justify-center items-start mt-[10vh] gap-8`}>
                            <Image className='' src={item.img} alt={item.alt} width='300' height='300' />
                            <div className={`flex justify-center items-start flex-col gap-5`}>
                                <small className="bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text">{item.subTitle}</small>
                                <h3 className="font-bold text-4xl">{item.title}</h3>
                                <p className="font-light">{item.text}</p>
                                <Link className="border-b-2 border-stone-100" href={item.buttonLink} >{item.buttonText}</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}