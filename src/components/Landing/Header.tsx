"use client"

import Image from "next/image";
import Link from "next/link";
import Logo from '@/assets/images/NFTGo.svg'
export default function Header() {
    const menu1 = [
        {
            id : 1,
            title : 'MarketPlace',
            link : '/MarketPlace',
        },
        {
            id : 2,
            title : 'Prompt',
            link : '/prompt',
        },
        {
            id : 3,
            title : 'Auction',
            link : '/auction',
        },
        {
            id : 4,
            title : 'About Us',
            link : '/about',
        },
    ]
    const menu2 = [
        {
            id : 1,
            title : 'users',
            link : '/users',
        },
        {
            id : 2,
            title : 'leadboard',
            link : '/leadboard',
        },
        {
            id : 3,
            title : 'explore',
            link : '/explore',
        },
        {
            id : 4,
            title : 'chatbot',
            link : '/chatbot',
        },
    ]
    return (
      <header className="grid grid-cols-3 gap-4 mt-5">
        <ul className="flex justify-center gap-5">
            {
                menu1.map(item => (
                    <Link key={item.id} href={item.link}><li>{item.title}</li></Link>
                ))
            }
        </ul>
        <div className="flex justify-center">
            <Image className="" src={Logo} alt="Logo" width='200' height='200' />
        </div>
        <ul className="flex justify-center gap-5">
            {
                menu2.map(item => (
                    <Link key={item.id} href={item.link}><li>{item.title}</li></Link>
                ))
            }
        </ul>
      </header>
    );
  }
  