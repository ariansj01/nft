'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import userData from '@/data/users.json';

export default function UsersPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('followers');
    const [filteredUsers, setFilteredUsers] = useState(userData.users);

    useEffect(() => {
        const filtered = userData.users
            .filter(user => 
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => {
                switch (sortBy) {
                    case 'followers':
                        return b.stats.followers - a.stats.followers;
                    case 'artworks':
                        return b.stats.artworks - a.stats.artworks;
                    case 'sales':
                        return b.stats.sales - a.stats.sales;
                    default:
                        return 0;
                }
            });
        setFilteredUsers(filtered);
    }, [searchQuery, sortBy]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-stone-900">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-white mb-8">Artists & Creators</h1>
                
                {/* Search and Sort */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            placeholder="Search by username or name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-stone-800 text-white px-4 py-3 rounded-lg border border-stone-700 focus:outline-none focus:border-[#EFDA1C] pl-12"
                        />
                        <svg 
                            className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-stone-800 text-white px-4 py-3 rounded-lg border border-stone-700 focus:outline-none focus:border-[#EFDA1C]"
                    >
                        <option value="followers">Most Followers</option>
                        <option value="artworks">Most Artworks</option>
                        <option value="sales">Most Sales</option>
                    </select>
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map(user => (
                        <Link 
                            href={`/users/${user.id}`}
                            key={user.id}
                            className="bg-stone-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
                        >
                            <div className="relative h-48">
                                <Image
                                    src={user.coverImage}
                                    alt={`${user.name}'s cover`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-16 h-16">
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-xl font-bold text-white">{user.name}</h2>
                                            {user.verified && (
                                                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <p className="text-gray-400">@{user.username}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-4 line-clamp-2">{user.bio}</p>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <div>
                                        <span className="font-bold text-white">{user.stats.artworks}</span> Artworks
                                    </div>
                                    <div>
                                        <span className="font-bold text-white">{user.stats.followers}</span> Followers
                                    </div>
                                    <div>
                                        <span className="font-bold text-white">{user.stats.sales}</span> Sales
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-xl">No users found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
