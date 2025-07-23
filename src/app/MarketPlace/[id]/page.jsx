'use client';
// import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import userData from '@/data/users.json';

export default function NFTDetailPage() {
    const params = useParams();
    const nftId = parseInt(params.id);
    // Find the NFT in the user data
    let nft = null;
    let owner = null;
    
    // for (const user of userData) {
    //     const foundNFT = user.nfts.find((n:any) => n.id === nftId);
    //     if (foundNFT) {
    //         nft = foundNFT;
    //         owner = user;
    //         break;
    //     }
    // }

    userData.map((user) => {
        const foundNFT = user.nfts.find((n) => n.id === nftId);
        if (foundNFT) {
            nft = foundNFT;
            owner = user;
        }
    })

    if (!nft || !owner) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black to-stone-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">NFT Not Found</h1>
                    <Link 
                        href="/MarketPlace"
                        className="bg-[#EFDA1C] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                    >
                        Back to Marketplace
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-stone-900">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* NFT Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden">
                        <Image
                            src={nft.image}
                            alt={nft.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    {/* NFT Details */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">{nft.title}</h1>
                            <div className="flex items-center gap-4">
                                <Link 
                                    href={`/users/${owner.id}`}
                                    className="flex items-center gap-2 group"
                                >
                                    <div className="relative w-10 h-10">
                                        <Image
                                            src={owner.avatar}
                                            alt={owner.name}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 group-hover:text-white transition-colors">@{owner.username}</p>
                                        <p className="text-white font-semibold">{owner.name}</p>
                                    </div>
                                </Link>
                                {owner.verified && (
                                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                        </div>

                        <div className="bg-stone-800 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-gray-400">Current Price</p>
                                    <p className="text-3xl font-bold text-[#EFDA1C]">{nft.price} ETH</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-400">Category</p>
                                    <p className="text-white font-semibold">{nft.category}</p>
                                </div>
                            </div>
                            <button className="w-full bg-[#EFDA1C] text-black py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                                Buy Now
                            </button>
                        </div>

                        <div className="bg-stone-800 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Description</h2>
                            <p className="text-gray-300">
                                This unique NFT artwork showcases the artist&apos;s distinctive style and creativity. 
                                Each piece is one-of-a-kind and comes with a certificate of authenticity.
                            </p>
                        </div>

                        <div className="bg-stone-800 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Details</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Created</span>
                                    <span className="text-white">{new Date(nft.dateCreated).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Token ID</span>
                                    <span className="text-white">#{nft.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Blockchain</span>
                                    <span className="text-white">Ethereum</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Contract Address</span>
                                    <span className="text-white truncate">0x1234...5678</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 