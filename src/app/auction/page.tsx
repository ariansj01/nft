'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import auctionData from '@/data/auctions.json';

export default function AuctionPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('endingSoon');

    const categories = ['All', 'Digital Art', 'Abstract Art'];
    const sortOptions = [
        { value: 'endingSoon', label: 'Ending Soon' },
        { value: 'newest', label: 'Newest' },
        { value: 'highestBid', label: 'Highest Bid' },
        { value: 'lowestBid', label: 'Lowest Bid' }
    ];

    const filteredAuctions = auctionData.auctions
        .filter(auction => selectedCategory === 'All' || auction.category === selectedCategory)
        .sort((a, b) => {
            switch (sortBy) {
                case 'endingSoon':
                    return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
                case 'newest':
                    return new Date(b.history.created).getTime() - new Date(a.history.created).getTime();
                case 'highestBid':
                    return b.currentBid - a.currentBid;
                case 'lowestBid':
                    return a.currentBid - b.currentBid;
                default:
                    return 0;
            }
        });

    const formatTimeLeft = (endTime: string) => {
        const end = new Date(endTime);
        const now = new Date();
        const diff = end.getTime() - now.getTime();
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        return `${days}d ${hours}h left`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-stone-900">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text mb-4 md:mb-0">
                        NFT Auctions
                    </h1>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-stone-800 text-white px-4 py-2 rounded-lg border border-stone-700 focus:outline-none focus:border-[#EFDA1C]"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-stone-800 text-white px-4 py-2 rounded-lg border border-stone-700 focus:outline-none focus:border-[#EFDA1C]"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAuctions.map((auction) => (
                        <Link href={`/auction/${auction.id}`} key={auction.id}>
                            <div className="bg-stone-900 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                                <div className="relative h-64">
                                    <Image
                                        src={auction.image}
                                        alt={auction.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                                        {formatTimeLeft(auction.endTime)}
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Image
                                            src={auction.creator.image}
                                            alt={auction.creator.name}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <h3 className="text-white font-semibold">{auction.creator.name}</h3>
                                            <p className="text-gray-400 text-sm">{auction.category}</p>
                                        </div>
                                    </div>
                                    
                                    <h2 className="text-xl font-bold text-white mb-2">{auction.title}</h2>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{auction.description}</p>
                                    
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-gray-400 text-sm">Current Bid</p>
                                            <p className="text-white font-bold">{auction.currentBid} ETH</p>
                                        </div>
                                        <div className="flex gap-2">
                                            {auction.tags.map(tag => (
                                                <span
                                                    key={tag}
                                                    className="text-xs bg-stone-800 text-gray-300 px-2 py-1 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
