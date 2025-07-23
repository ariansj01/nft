'use client'
import Brand1 from '@/assets/images/div.brand__item.svg' 
import Brand2 from '@/assets/images/div.brand__item1.svg' 
import Brand3 from '@/assets/images/div.brand__item2.svg' 
import Brand4 from '@/assets/images/div.brand__item3.svg' 
import Brand5 from '@/assets/images/brand5.svg' 
import Image from 'next/image'
import { Splide, SplideSlide } from '@splidejs/react-splide';
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
        src : Brand1
    } ,
    {
        id : 2,
        alt : 'Brand 2',
        src : Brand2
    } ,
    {
        id : 3,
        alt : 'Brand 3',
        src : Brand3
    } ,
    {
        id : 4,
        alt : 'Brand 4',
        src : Brand4
    } ,
    {
        id : 5,
        alt : 'Brand 5',
        src : Brand5
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