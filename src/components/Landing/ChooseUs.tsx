'use client'
import icon from '@/assets/images/Icon.svg'
import icon2 from '@/assets/images/Icon2.svg'
import icon3 from '@/assets/images/Icon3.svg'
import icon4 from '@/assets/images/Icon4.svg'
import Image from 'next/image'
import badge from "@/assets/images/Badge.svg";

export default function ChooseUs() {

    type obgCard = {
        id : number ,
        icon : string,
        title : string,
        text : string,
        class : string,
    }
    const Card : obgCard[] = [ 
        {
            id : 1,
            icon : icon,
            title : 'Huge Collection',
            text : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
            class : ''
        },
        {
            id : 2,
            icon : icon2,
            title : 'Huge Collection',
            text : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
            class : 'translate-y-5'
        },
        {
            id : 3,
            icon : icon3,
            title : 'Huge Collection',
            text : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
            class : ''
        },
        {
            id : 4,
            icon : icon4,
            title : 'Huge Collection',
            text : 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
            class : 'translate-y-5'
        },
    ]

    return(
        <section className='flex justify-center items-center flex-col'>
            <Image className='mx-auto my-[15vh]' src={badge} alt='badge' width='50' height='50' />
            
            <h2 className='text-center mb-[5vh] text-4xl font-bold'>why <span className='bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text' >choose us</span></h2>
            <div className="flex gap-4 w-[60%]">
                {
                    Card.map(item => (
                        <div key={item.id} className={`flex flex-col justify-start w-[50%] px-[15px] py-[30px] border border-stone-800 rounded-xl ${item.class}`}>
                            <Image className='' src={item.icon} alt='badge' width='50' height='50' />
                            <h3 className='text-xl font-bold my-[5vh]'>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}