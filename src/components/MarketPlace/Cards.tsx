import Image from 'next/image'
import NFT1 from '@/assets/images/NFT-1.svg'
import { Pagination } from 'antd';

export default function Cards() {
    type TCard = {
        id : number
        image : string
        title : string
        creator : string
        profileCreator : string
        price : string
        highestBid : string
        likes : string
        class : string
    }
    const Cards : TCard[] = [
        {
            id :1,
            image : NFT1,
            title : 'Designer Bear',
            creator : 'mr fox',
            profileCreator : NFT1,
            price : '0.2ETH,',
            highestBid : '0.5ETH',
            likes : '232',
            class : 'row-span-2'
        },
        {
            id :2,
            image : NFT1,
            title : 'Designer Bear',
            creator : 'mr fox',
            profileCreator : NFT1,
            price : '0.2ETH,',
            highestBid : '0.5ETH',
            likes : '232',
            class : 'row-span-2'
        },
        {
            id :3,
            image : NFT1,
            title : 'Designer Bear',
            creator : 'mr fox',
            profileCreator : NFT1,
            price : '0.2ETH,',
            highestBid : '0.5ETH',
            likes : '232',
            class : 'row-span-2'
        },
        {
            id :4,
            image : NFT1,
            title : 'Designer Bear',
            creator : 'mr fox',
            profileCreator : NFT1,
            price : '0.2ETH,',
            highestBid : '0.5ETH',
            likes : '232',
            class : 'row-span-2'
        },
        {
            id :5,
            image : NFT1,
            title : 'Designer Bear',
            creator : 'mr fox',
            profileCreator : NFT1,
            price : '0.2ETH,',
            highestBid : '0.5ETH',
            likes : '232',
            class : 'row-span-2'
        },
        {
            id :6,
            image : NFT1,
            title : 'Designer Bear',
            creator : 'mr fox',
            profileCreator : NFT1,
            price : '0.2ETH,',
            highestBid : '0.5ETH',
            likes : '232',
            class : 'row-span-2'
        },
        {
            id :7,
            image : NFT1,
            title : 'Designer Bear',
            creator : 'mr fox',
            profileCreator : NFT1,
            price : '0.2ETH,',
            highestBid : '0.5ETH',
            likes : '232',
            class : 'row-span-2'
        },
        {
            id :8,
            image : NFT1,
            title : 'Designer Bear',
            creator : 'mr fox',
            profileCreator : NFT1,
            price : '0.2ETH,',
            highestBid : '0.5ETH',
            likes : '232',
            class : 'row-span-2'
        },
        {
            id :9,
            image : NFT1,
            title : 'Designer Bear',
            creator : 'mr fox',
            profileCreator : NFT1,
            price : '0.2ETH,',
            highestBid : '0.5ETH',
            likes : '232',
            class : 'row-span-2'
        },
    ]
    return(
        <section className='bg-stone-600'>
            <div className="grid grid-cols-3 grid-rows-2 gap-5 bg-stone-600 mx-auto w-[60%] py-[5%]">
                {
                    Cards.map((item) => (
                        <div key={item.id} className="flex justify-center items-center flex-col gap-4 bg-stone-800 rounded-2xl">
                            <Image src={item.image} alt={item.title} className='w-[100vh] ]' width='50' height='50' />

                            <div className="flex justify-center items-start flex-col gap-2 pl-3 w-[100%]">
                                <p className='font-bold text-xl' >{item.title}</p>
                                <div className='flex gap-2'>
                                    <Image src={item.profileCreator} alt={item.creator} className='rounded-full' width='20' height='20' />
                                    <span>{item.creator}</span>
                                </div>
                            </div>
                            <p className='w-[100%] text-start pl-3'>Likes {item.likes}</p>
                            <div className="flex justify-between px-3 te items-center w-[100%]">
                                <div className="flex flex-col gap-2">
                                    <small>price</small>
                                    <p className='font-bold'>{item.price}</p>
                                </div>
                                <div className="flex flex-col gap-2 mb-3">
                                    <small>Highest Bid</small>
                                    <p>{item.highestBid}</p>
                                </div>
                            </div>
                        </div>       
                    ))
                }
            </div>
            <Pagination align="center" defaultCurrent={1} total={50} className='mb-3' />
        </section>
    )
}