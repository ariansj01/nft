'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import userData from '@/data/users.json';

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const userId = parseInt(params.id as string);
    const user = userData.users.find(u => u.id === userId);
    const [activeTab, setActiveTab] = useState('nfts');
    const [isFollowing, setIsFollowing] = useState(false);

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black to-stone-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">User Not Found</h1>
                    <Link 
                        href="/users"
                        className="bg-[#EFDA1C] text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                    >
                        Back to Users
                    </Link>
                </div>
            </div>
        );
    }

    const handleNFTClick = (nftId: number) => {
        router.push(`/MarketPlace/${nftId}`);
    };

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-stone-900">
            {/* Cover Image */}
            <div className="relative h-64 md:h-96">
                <Image
                    src={user.coverImage}
                    alt={`${user.name}'s cover`}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                    <div className="container mx-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative w-20 h-20 md:w-32 md:h-32">
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        fill
                                        className="rounded-full object-cover border-4 border-stone-900"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h1 className="text-2xl md:text-4xl font-bold text-white">{user.name}</h1>
                                        {user.verified && (
                                            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <p className="text-gray-400">@{user.username}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleFollow}
                                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                                    isFollowing
                                        ? 'bg-stone-800 text-white hover:bg-stone-700'
                                        : 'bg-[#EFDA1C] text-black hover:bg-yellow-500'
                                }`}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Bio and Social Links */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="flex-1">
                        <p className="text-gray-300 mb-6 text-lg">{user.bio}</p>
                        <div className="flex gap-4">
                            <a 
                                href={`https://twitter.com/${user.social.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                            <a 
                                href={`https://instagram.com/${user.social.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                                </svg>
                            </a>
                            <a 
                                href={`https://${user.social.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0 4c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-stone-800 p-6 rounded-xl text-center hover:bg-stone-700 transition-colors">
                            <div className="text-3xl font-bold text-white mb-2">{user.stats.artworks}</div>
                            <div className="text-gray-400">Artworks</div>
                        </div>
                        <div className="bg-stone-800 p-6 rounded-xl text-center hover:bg-stone-700 transition-colors">
                            <div className="text-3xl font-bold text-white mb-2">{user.stats.followers}</div>
                            <div className="text-gray-400">Followers</div>
                        </div>
                        <div className="bg-stone-800 p-6 rounded-xl text-center hover:bg-stone-700 transition-colors">
                            <div className="text-3xl font-bold text-white mb-2">{user.stats.following}</div>
                            <div className="text-gray-400">Following</div>
                        </div>
                        <div className="bg-stone-800 p-6 rounded-xl text-center hover:bg-stone-700 transition-colors">
                            <div className="text-3xl font-bold text-white mb-2">{user.stats.sales}</div>
                            <div className="text-gray-400">Sales</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-stone-700">
                    <button
                        onClick={() => setActiveTab('nfts')}
                        className={`pb-4 px-4 font-semibold ${
                            activeTab === 'nfts'
                                ? 'text-[#EFDA1C] border-b-2 border-[#EFDA1C]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        NFTs
                    </button>
                    <button
                        onClick={() => setActiveTab('activity')}
                        className={`pb-4 px-4 font-semibold ${
                            activeTab === 'activity'
                                ? 'text-[#EFDA1C] border-b-2 border-[#EFDA1C]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Activity
                    </button>
                    <button
                        onClick={() => setActiveTab('collections')}
                        className={`pb-4 px-4 font-semibold ${
                            activeTab === 'collections'
                                ? 'text-[#EFDA1C] border-b-2 border-[#EFDA1C]'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Collections
                    </button>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'nfts' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {user.nfts.map(nft => (
                            <div 
                                key={nft.id} 
                                onClick={() => handleNFTClick(nft.id)}
                                className="bg-stone-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer group"
                            >
                                <div className="relative h-64">
                                    <Image
                                        src={nft.image}
                                        alt={nft.title}
                                        fill
                                        className="object-cover group-hover:opacity-90 transition-opacity"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-xl font-bold text-white mb-2">{nft.title}</h3>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#EFDA1C] font-bold">{nft.price} ETH</span>
                                            <span className="text-gray-400 text-sm">{new Date(nft.dateCreated).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-gray-400 mb-2">{nft.category}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#EFDA1C] text-sm">View Details</span>
                                        <svg className="w-4 h-4 text-[#EFDA1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-stone-800 rounded-xl p-4 hover:bg-stone-700 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-stone-700 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-[#EFDA1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white">Liked NFT &quot;Cyberpunk City #1&quot;</p>
                                        <p className="text-gray-400 text-sm">2 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'collections' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-stone-800 rounded-xl overflow-hidden">
                                <div className="relative h-48">
                                    <Image
                                        src={user.coverImage}
                                        alt="Collection"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-white mb-2">Collection {item}</h3>
                                    <p className="text-gray-400 mb-4">A curated collection of digital art</p>
                                    <div className="flex items-center gap-2 text-[#EFDA1C]">
                                        <span className="text-sm">View Collection</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 