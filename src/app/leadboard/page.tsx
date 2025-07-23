'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import userData from '@/data/users.json';

// interface LeaderboardUser {
//     id: number;
//     name: string;
//     username: string;
//     avatar: string;
//     verified: boolean;
//     stats: {
//         artworks: number;
//         followers: number;
//         sales: number;
//         volume: number;
//         likes: number;
//         views: number;
//     };
//     nfts: {
//         id: number;
//         title: string;
//         image: string;
//         price: number;
//         likes: number;
//         views: number;
//         category: string;
//     }[];
// }

export default function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [timeFilter, setTimeFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSection, setActiveSection] = useState('users');

    // Process and sort users based on filters
    const sortedUsers = useMemo(() => {
        let users = [...userData.users].map(user => ({
            ...user,
            stats: {
                ...user.stats,
                volume: user.stats.sales * 0.1, // Assuming each sale is 0.1 ETH
                likes: Math.floor(Math.random() * 1000), // Simulated likes
                views: Math.floor(Math.random() * 5000) // Simulated views
            }
        }));

        // Apply search filter
        if (searchQuery) {
            users = users.filter(user => 
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.username.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply category filter
        if (activeTab === 'creators') {
            users = users.filter(user => user.stats.artworks > 0);
        } else if (activeTab === 'collectors') {
            users = users.filter(user => user.stats.sales > 0);
        }

        // Sort based on time filter
        if (timeFilter === 'week') {
            users = users.map(user => ({
                ...user,
                stats: {
                    ...user.stats,
                    sales: Math.floor(user.stats.sales * 0.3),
                    volume: Math.floor(user.stats.sales * 0.3) * 0.1
                }
            }));
        } else if (timeFilter === 'month') {
            users = users.map(user => ({
                ...user,
                stats: {
                    ...user.stats,
                    sales: Math.floor(user.stats.sales * 0.7),
                    volume: Math.floor(user.stats.sales * 0.7) * 0.1
                }
            }));
        }

        return users.sort((a, b) => b.stats.volume - a.stats.volume);
    }, [activeTab, timeFilter, searchQuery]);

    // Get top NFTs
    const topNFTs = useMemo(() => {
        const allNFTs = sortedUsers.flatMap(user => 
            user.nfts.map(nft => ({
                ...nft,
                owner: user,
                likes: Math.floor(Math.random() * 1000),
                views: Math.floor(Math.random() * 5000)
            }))
        );
        return allNFTs.sort((a, b) => b.likes - a.likes).slice(0, 5);
    }, [sortedUsers]);

    // Get trending collections
    const trendingCollections = useMemo(() => {
        const collections = [
            { id: 1, name: 'Digital Art Collection', image: '/images/collection1.jpg', items: 25, floorPrice: 0.5 },
            { id: 2, name: 'Crypto Punks', image: '/images/collection2.jpg', items: 50, floorPrice: 1.2 },
            { id: 3, name: 'Bored Ape Yacht Club', image: '/images/collection3.jpg', items: 30, floorPrice: 2.5 },
            { id: 4, name: 'Art Blocks', image: '/images/collection4.jpg', items: 40, floorPrice: 0.8 },
            { id: 5, name: 'World of Women', image: '/images/collection5.jpg', items: 35, floorPrice: 1.5 }
        ];
        return collections.sort((a, b) => b.floorPrice - a.floorPrice);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-stone-900">
            <div className="container mx-auto px-4 py-12">
                {/* Header with Search */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Leaderboard</h1>
                    <p className="text-gray-400 text-lg">Discover the top creators, collectors, and NFTs in our community</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search users, NFTs, or collections..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-stone-800 text-white px-6 py-4 rounded-2xl border border-stone-700 focus:border-[#EFDA1C] focus:outline-none transition-colors"
                        />
                        <svg
                            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Section Tabs */}
                <div className="flex gap-4 mb-8 border-b border-stone-700">
                    <button
                        onClick={() => setActiveSection('users')}
                        className={`pb-4 px-6 font-semibold ${
                            activeSection === 'users'
                                ? 'text-[#EFDA1C] border-b-2 border-[#EFDA1C]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Top Users
                    </button>
                    <button
                        onClick={() => setActiveSection('nfts')}
                        className={`pb-4 px-6 font-semibold ${
                            activeSection === 'nfts'
                                ? 'text-[#EFDA1C] border-b-2 border-[#EFDA1C]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Top NFTs
                    </button>
                    <button
                        onClick={() => setActiveSection('collections')}
                        className={`pb-4 px-6 font-semibold ${
                            activeSection === 'collections'
                                ? 'text-[#EFDA1C] border-b-2 border-[#EFDA1C]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Trending Collections
                    </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                                activeTab === 'all'
                                    ? 'bg-[#EFDA1C] text-black shadow-lg shadow-[#EFDA1C]/20'
                                    : 'bg-stone-800 text-gray-400 hover:text-white hover:bg-stone-700'
                            }`}
                        >
                            All Time
                        </button>
                        <button
                            onClick={() => setActiveTab('creators')}
                            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                                activeTab === 'creators'
                                    ? 'bg-[#EFDA1C] text-black shadow-lg shadow-[#EFDA1C]/20'
                                    : 'bg-stone-800 text-gray-400 hover:text-white hover:bg-stone-700'
                            }`}
                        >
                            Top Creators
                        </button>
                        <button
                            onClick={() => setActiveTab('collectors')}
                            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                                activeTab === 'collectors'
                                    ? 'bg-[#EFDA1C] text-black shadow-lg shadow-[#EFDA1C]/20'
                                    : 'bg-stone-800 text-gray-400 hover:text-white hover:bg-stone-700'
                            }`}
                        >
                            Top Collectors
                        </button>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <button
                            onClick={() => setTimeFilter('all')}
                            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                                timeFilter === 'all'
                                    ? 'bg-[#EFDA1C] text-black shadow-lg shadow-[#EFDA1C]/20'
                                    : 'bg-stone-800 text-gray-400 hover:text-white hover:bg-stone-700'
                            }`}
                        >
                            All Time
                        </button>
                        <button
                            onClick={() => setTimeFilter('week')}
                            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                                timeFilter === 'week'
                                    ? 'bg-[#EFDA1C] text-black shadow-lg shadow-[#EFDA1C]/20'
                                    : 'bg-stone-800 text-gray-400 hover:text-white hover:bg-stone-700'
                            }`}
                        >
                            This Week
                        </button>
                        <button
                            onClick={() => setTimeFilter('month')}
                            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                                timeFilter === 'month'
                                    ? 'bg-[#EFDA1C] text-black shadow-lg shadow-[#EFDA1C]/20'
                                    : 'bg-stone-800 text-gray-400 hover:text-white hover:bg-stone-700'
                            }`}
                        >
                            This Month
                        </button>
                    </div>
                </div>

                {/* Content Sections */}
                {activeSection === 'users' && (
                    <>
                        {/* Leaderboard Table */}
                        <div className="bg-stone-800 rounded-2xl overflow-hidden shadow-xl">
                            <div className="grid grid-cols-12 gap-4 p-6 border-b border-stone-700 text-gray-400 font-semibold">
                                <div className="col-span-1 text-center">Rank</div>
                                <div className="col-span-4">User</div>
                                <div className="col-span-2 text-center">Artworks</div>
                                <div className="col-span-2 text-center">Followers</div>
                                <div className="col-span-2 text-center">Sales</div>
                                <div className="col-span-1 text-center">Volume</div>
                            </div>
                            {sortedUsers.map((user, index) => (
                                <div
                                    key={user.id}
                                    className="grid grid-cols-12 gap-4 p-6 border-b border-stone-700 hover:bg-stone-700 transition-all duration-300 group"
                                >
                                    <div className="col-span-1 flex items-center justify-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                            index === 0 ? 'bg-[#EFDA1C] text-black shadow-lg shadow-[#EFDA1C]/20' :
                                            index === 1 ? 'bg-gray-400 text-black shadow-lg shadow-gray-400/20' :
                                            index === 2 ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' :
                                            'bg-stone-700 text-gray-400 group-hover:bg-stone-600'
                                        }`}>
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="col-span-4 flex items-center gap-4">
                                        <Link href={`/users/${user.id}`} className="flex items-center gap-4 group">
                                            <div className="relative w-12 h-12">
                                                <Image
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    fill
                                                    className="rounded-full object-cover border-2 border-stone-700 group-hover:border-[#EFDA1C] transition-all duration-300"
                                                />
                                            </div>
        <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white group-hover:text-[#EFDA1C] transition-colors duration-300">
                                                        {user.name}
                                                    </span>
                                                    {user.verified && (
                                                        <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className="text-gray-400 text-sm group-hover:text-white transition-colors duration-300">@{user.username}</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center text-white">
                                        {user.stats.artworks}
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center text-white">
                                        {user.stats.followers}
                                    </div>
                                    <div className="col-span-2 flex items-center justify-center text-white">
                                        {user.stats.sales}
                                    </div>
                                    <div className="col-span-1 flex items-center justify-center text-[#EFDA1C] font-bold">
                                        {user.stats.volume} ETH
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeSection === 'nfts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topNFTs.map((nft, index) => (
                            <div key={nft.id} className="bg-stone-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#EFDA1C]/20 transition-all duration-300 group">
                                <div className="relative aspect-square">
                                    <Image
                                        src={nft.image}
                                        alt={nft.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            index === 0 ? 'bg-[#EFDA1C] text-black' :
                                            index === 1 ? 'bg-gray-400 text-black' :
                                            index === 2 ? 'bg-amber-600 text-white' :
                                            'bg-stone-700 text-gray-400'
                                        }`}>
                                            {index + 1}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{nft.title}</h3>
                                    <div className="flex items-center gap-4 mb-4">
                                        <Link href={`/users/${nft.owner.id}`} className="flex items-center gap-2 group">
                                            <div className="relative w-8 h-8">
                                                <Image
                                                    src={nft.owner.avatar}
                                                    alt={nft.owner.name}
                                                    fill
                                                    className="rounded-full object-cover"
                                                />
                                            </div>
                                            <span className="text-gray-400 group-hover:text-white transition-colors">@{nft.owner.username}</span>
                                        </Link>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="text-[#EFDA1C] font-bold">{nft.price} ETH</div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                <span>{nft.likes}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                <span>{nft.views}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === 'collections' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trendingCollections.map((collection, index) => (
                            <div key={collection.id} className="bg-stone-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-[#EFDA1C]/20 transition-all duration-300 group">
                                <div className="relative aspect-video">
                                    <Image
                                        src={collection.image}
                                        alt={collection.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            index === 0 ? 'bg-[#EFDA1C] text-black' :
                                            index === 1 ? 'bg-gray-400 text-black' :
                                            index === 2 ? 'bg-amber-600 text-white' :
                                            'bg-stone-700 text-gray-400'
                                        }`}>
                                            {index + 1}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{collection.name}</h3>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-gray-400">{collection.items} items</div>
                                        <div className="text-[#EFDA1C] font-bold">{collection.floorPrice} ETH floor</div>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#EFDA1C]">
                                        <span>View Collection</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-stone-800 rounded-2xl p-6 shadow-xl hover:shadow-[#EFDA1C]/20 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Total Volume</h3>
                            <svg className="w-6 h-6 text-[#EFDA1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-3xl font-bold text-[#EFDA1C]">
                            {sortedUsers.reduce((sum, user) => sum + user.stats.volume, 0).toFixed(2)} ETH
                        </p>
                        <p className="text-gray-400 mt-2">Total trading volume</p>
                    </div>
                    <div className="bg-stone-800 rounded-2xl p-6 shadow-xl hover:shadow-[#EFDA1C]/20 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Total Sales</h3>
                            <svg className="w-6 h-6 text-[#EFDA1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <p className="text-3xl font-bold text-[#EFDA1C]">
                            {sortedUsers.reduce((sum, user) => sum + user.stats.sales, 0)}
                        </p>
                        <p className="text-gray-400 mt-2">Total number of sales</p>
                    </div>
                    <div className="bg-stone-800 rounded-2xl p-6 shadow-xl hover:shadow-[#EFDA1C]/20 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-white">Active Users</h3>
                            <svg className="w-6 h-6 text-[#EFDA1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <p className="text-3xl font-bold text-[#EFDA1C]">{sortedUsers.length}</p>
                        <p className="text-gray-400 mt-2">Active creators and collectors</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
