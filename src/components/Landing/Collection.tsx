'use client'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import badge from "@/assets/images/Badge.svg";
import CardImg from "@/assets/images/CardImage.svg";
import CardImg2 from "@/assets/images/CardIMG-2.svg";
import CardImg3 from "@/assets/images/CardIMG-3.svg";
import CardImg4 from "@/assets/images/CardIMG-4.svg";
import Image from 'next/image';

export default function Collection () {
 
    type obgImage = {
            id : number ,
            alt : string,
            src : string,
            title : string,
            SubTitle : string,
    }
    const CollectionCard : obgImage[] = [ 
        {
            id : 1,
            alt : 'Brand 1',
            src : CardImg,
            title : '#Metaverse',
            SubTitle : 'this is the text'
        } ,
        {
            id : 2,
            alt : 'Brand 2',
            src : CardImg2,
            title : '#Metaverse',
            SubTitle : 'this is the text'
        } ,
        {
            id : 3,
            alt : 'Brand 3',
            src : CardImg3,
            title : '#Metaverse',
            SubTitle : 'this is the text'
        } ,
        {
            id : 4,
            alt : 'Brand 4',
            src : CardImg4,
            title : '#Metaverse',
            SubTitle : 'this is the text'
        } ,
        {
            id : 5,
            alt : 'Brand 5',
            src : CardImg,
            title : '#Metaverse',
            SubTitle : 'this is the text'
        } ,
    ]

    return(
        <section className='max-w-7xl mx-auto px-4' >
            <Image className='mx-auto my-[15vh]' src={badge} alt='badge' width='50' height='50' />
            <h2 className='text-center mb-[5vh] text-4xl font-bold'>Nfthub <span className='bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text' >Collection</span></h2>
            <Splide
            options={{
                perPage: 4,
                gap: '2rem',
                breakpoints: {
                640: {
                    perPage: 3,
                    gap: '.7rem',
                    height: '6rem',
                },
                480: {
                    perPage: 1,
                    gap: '.7rem',
                    height: '6rem',
                },
                },
            }}
            aria-label="Responsive Splide Slider"
            >
                {
                    CollectionCard.map((item, index) => (
                        <SplideSlide key={index}>
                            <div className="flex flex-col text-center">
                                <Image key={item.id} className='text-center' src={item.src} alt={item.alt} width='244' height='200' />
                                <h3 className='font-bold mt-2' >{item.title}</h3>
                                <small className='font-light'>{item.SubTitle}</small>
                            </div>
                        </SplideSlide>
                    ))
                }
            </Splide>
            <div className="flex justify-center my-[10vh]">
                <button className="mx-auto p-2 rounded-2xl border bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-stone-900">View Collection</button>
            </div>
        </section>
    )
}