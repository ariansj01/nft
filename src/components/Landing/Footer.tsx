'use client'
import mainLogo from "@/assets/images/MainLogo.svg";
import Image from "next/image";
import discord from "@/assets/images/discord.svg";
import instagram from "@/assets/images/instagram.svg";
import x from "@/assets/images/x.svg";
import Link from "next/link";

const Footer = () => {
    type objItems = {
        id : number ,
        title : string,
        items : [
            {
                text : string
                link : string
            },
            {
                text : string
                link : string
            },
            {
                text : string
                link : string
            },
            {
                text : string
                link : string
            },
        ]
    }
    const menu : objItems[] = [
        {
        id : 1 ,
        title : 'Comunity',
        items : [
            {
                text : 'test',
                link : '/test'
            },
            {
                text : 'test',
                link : '/test'
            },
            {
                text : 'test',
                link : '/test'
            },
            {
                text : 'test',
                link : '/test'
            },
        ]   
        },
        {
        id : 2 ,
        title : 'Quick Link',
        items : [
            {
                text : 'test',
                link : '/test'
            },
            {
                text : 'test',
                link : '/test'
            },
            {
                text : 'test',
                link : '/test'
            },
            {
                text : 'test',
                link : '/test'
            },
        ]   
        },
    ]
    return(
        <>
            <section className="flex justify-center items-center border-t-1 border-stone-700 pt-5 mt-[10vh]" >
                <div className="container mx-auto px-4 flex justify-around items-center gap-[15vh] flex-wrap">
                    <div className="flex justify-center items-center flex-col gap-3">
                        <Image className='mx-auto' src={mainLogo} alt='badge' width='200' height='200' />
                        <p className="w-full md:w-1/2 text-center" >Join our Discord channel or follow us on Twitter to keep up to date with our latest work and announcements.</p>
                        <div className="flex gap-3">
                        <Image className='' src={x} alt='x platform' width='15' height='15' />
                        <Image className='' src={discord} alt='x platform' width='15' height='15' />
                        <Image className='' src={instagram} alt='x platform' width='15' height='15' />
                        </div>
                    </div>
                    
                    <div className="flex justify-center items-center gap-[8vh] mt-[3vh] flex-wrap" >
                        {
                            menu.map((item , index) => (
                                <div key={index} className="text-center">
                                    <p className="text-2xl font-bold">{item.title}</p>
                                    {
                                        item.items.map((menu, index) => (
                                            <div key={index} className="mt-5">
                                                <Link href={menu.link}>{menu.text}</Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>
            <p className="text-center mt-[5vh] ">Arian Seyedi</p>
        </>
    )
}

Footer.displayName = 'Footer';
export default Footer;