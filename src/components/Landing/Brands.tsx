'use client'
import Image from 'next/image'
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/react-splide';
// @ts-ignore
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css'; // استایل پیش‌فرض

export default function Brands() {
    type obgImage = {
        id : number ,
        alt : string,
        src : string
    }
    const brands : obgImage[] = [ 
    {
        id : 1,
        alt : 'Brand 1',
        src : '/images/div.brand__item.svg'
    } ,
    {
        id : 2,
        alt : 'Brand 2',
        src : '/images/div.brand__item1.svg'
    } ,
    {
        id : 3,
        alt : 'Brand 3',
        src : '/images/div.brand__item2.svg'
    } ,
    {
        id : 4,
        alt : 'Brand 4',
        src : '/images/div.brand__item3.svg'
    } ,
    {
        id : 5,
        alt : 'Brand 5',
        src : '/images/brand5.svg'
    } ,
    ]
    return(
        <div className="mx-auto w-200 mt-[100px]">
            <Splide
        options={{
            type: 'loop',
            drag: 'free',
            focus: 'center',
            perPage: 3,
            autoScroll: {
            speed: 1,
            },
        }}
        extensions={{ AutoScroll }}
        aria-label="React Splide with Auto Scroll"
        >
            {
                brands.map((brand, index) => (
                    <SplideSlide key={index}>
                        <div className="flex items-center justify-center">
                            <Image
                                src={brand.src}
                                alt={brand.alt}
                                width={150}
                                height={50}
                                className="opacity-50 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </SplideSlide>
                ))
            }
            </Splide>
        </div>
    )
}