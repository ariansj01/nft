'use client'
import Image from "next/image";
import Character from '@/assets/images/кот.svg'
// import Street from '@/assets/images/Rectangle91.svg'
import Character2 from '@/assets/images/Rectangle1.svg'
import Character3 from '@/assets/images/Rectangle2.svg'
import Character4 from '@/assets/images/Rectangle3.svg'
import BobCharacter from '@/assets/images/RectangleBob.svg'
import Link from "next/link";

export default function HeroSection() {
    type obgImage = {
        alt : string,
        src : string
    }
    const arr : obgImage[] = [ 
    {
        alt : 'Character 2',
        src : Character2
    } ,
    {
        alt : 'Character 3',
        src : Character3
    } ,
    {
        alt : 'Character 4',
        src : Character4
    } ,
]
 return (
    <main>
        <section className="grid grid-cols-3 gap-4 mt-5">
            <div className="col-span-2 text-center">
                <h2 className="text-7xl font-bold mt-[5%] md:ml-[20%]">NFT MarketPlace This Is The Test</h2>
                <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="text-end me-[7%]">
                        <Link href="/auth" className="mx-2 p-2 rounded-2xl border bg-[#EFDA1C] text-neutral-900">Login now</Link>
                        <button className="mx-2 p-2 rounded-2xl border border-[#00ffe0] text-[#00ffe0]">Market NFT</button>
                    </div>
                    <div className="m-5">
                        <p className="text-[#00ffe0]">
                            distinctio vitae, nisi asperiores ea quod adipisci velit? Et facilis dolorem autem voluptas, saepe nesciunt eligendi quasi? Ratione quasi nobis et adipisci consequatur perspiciatis aliquam dolore repudiandae?
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <div className="bg trans20 m-5 rounded-2xl w-[200px]">
                    <Image className="Character" src={Character} alt="Logo" width='200' height='200' />
                </div>
            </div>
        </section>

        <section className="flex justify-start gap-[20px] ml-[15%] mt-5 text-center">
            {
               arr.map((item , index) => (
                <div key={index} className="flex justify-center" style={{position:'relative'}}>
                    <div className="bg rounded-2xl shadow w-[250px] h-[150px] absolute bottom-0 -z-10"></div>
                    <Image className="" src={item.src} alt={item.alt} width='250' height='250' />
                    <button className="PlusBtn border border-stone-50 rounded-full p-1 w-[50px] bg-[#ffffff42] text-2xl font-bold" >+</button>
                </div>
               ))
            }
        </section>
        <section className="flex justify-end" style={{position:'relative'}}>
            <div className="bg-[url(../assets/images/Rectangle91.svg)] brightness-50 w-[50%] h-full -z-40 absolute right-[50px] top-[-100px]"></div>
         <Image className="" src={BobCharacter} alt='Bob Character' width='200' height='200' />
        </section>
    </main>
 )   
}