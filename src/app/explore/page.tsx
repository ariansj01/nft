'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface NFT {
    id: number;
    title: string;
    image: string;
    price: number;
    likes: number;
    views: number;
    category: string;
    owner: {
        id: number;
        name: string;
        username: string;
        avatar: string;
    };
}

export default function ExplorePage() {
    const router = useRouter();
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [likedNFTs, setLikedNFTs] = useState<number[]>([]);

    // Simulated categories
    const categories = [
        { id: 'all', name: 'All' },
        { id: 'art', name: 'Art' },
        { id: 'photography', name: 'Photography' },
        { id: 'collectibles', name: 'Collectibles' },
        { id: 'music', name: 'Music' },
        { id: 'virtual-worlds', name: 'Virtual Worlds' },
    ];

    // Simulated NFT data
    useEffect(() => {
        const generateNFTs = () => {
            const mockNFTs: NFT[] = Array.from({ length: 30 }, (_, i) => ({
                id: i + 1,
                title: `NFT Artwork ${i + 1}`,
                image: `/images/CardIMG-${(i % 4) + 1}.svg`,
                price: Math.random() * 10,
                likes: Math.floor(Math.random() * 1000),
                views: Math.floor(Math.random() * 5000),
                category: ['art', 'photography', 'collectibles', 'music', 'virtual-worlds'][Math.floor(Math.random() * 5)],
                owner: {
                    id: i + 1,
                    name: `Artist ${i + 1}`,
                    username: `artist${i + 1}`,
                    avatar: `/images/User${(i % 4) + 1}.svg`,
                },
            }));
            setNfts(mockNFTs);
            setIsLoading(false);
        };

        generateNFTs();
    }, []);

    const filteredNFTs = nfts.filter(nft => {
        const matchesCategory = selectedCategory === 'all' || nft.category === selectedCategory;
        const matchesSearch = searchQuery === '' || 
            nft.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            nft.owner.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleLike = (nftId: number) => {
        setLikedNFTs(prev => {
            if (prev.includes(nftId)) {
                return prev.filter(id => id !== nftId);
            } else {
                return [...prev, nftId];
            }
        });
    };

    const handleUserClick = (userId: number) => {
        router.push(`/users/${userId}`);
    };

    const handleNFTClick = (nftId: number) => {
        router.push(`/MarketPlace/${nftId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-stone-900">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Explore</h1>
                    <p className="text-gray-400 text-lg">Discover amazing digital art and collectibles</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search NFTs, artists, or categories..."
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

                {/* Categories */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                                selectedCategory === category.id
                                    ? 'bg-[#EFDA1C] text-black shadow-lg shadow-[#EFDA1C]/20'
                                    : 'bg-stone-800 text-gray-400 hover:text-white hover:bg-stone-700'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* NFT Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="bg-stone-800 rounded-2xl aspect-square animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {filteredNFTs.map((nft) => (
                                <motion.div
                                    key={nft.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="group relative aspect-square cursor-pointer"
                                    onClick={() => setSelectedNFT(nft)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                    <Image
                                        src={nft.image}
                                        alt={nft.title}
                                        fill
                                        className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="relative w-8 h-8">
                                                <Image
                                                    src={nft.owner.avatar}
                                                    alt={nft.owner.name}
                                                    fill
                                                    className="rounded-full object-cover"
                                                />
                                            </div>
                                            <span className="text-white font-semibold">@{nft.owner.username}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white font-bold">{nft.price} ETH</span>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1 text-white">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                    <span>{nft.likes}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-white">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span>{nft.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* NFT Modal */}
                <AnimatePresence>
                    {selectedNFT && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                            onClick={() => setSelectedNFT(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                className="bg-stone-800 rounded-2xl max-w-4xl w-full overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="relative aspect-square">
                                        <Image
                                            src={selectedNFT.image}
                                            alt={selectedNFT.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-2xl font-bold text-white">{selectedNFT.title}</h2>
                                            <button
                                                onClick={() => setSelectedNFT(null)}
                                                className="text-gray-400 hover:text-white"
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div 
                                            className="flex items-center gap-2 mb-4 cursor-pointer group"
                                            onClick={() => handleUserClick(selectedNFT.owner.id)}
                                        >
                                            <div className="relative w-10 h-10">
                                                <Image
                                                    src={selectedNFT.owner.avatar}
                                                    alt={selectedNFT.owner.name}
                                                    fill
                                                    className="rounded-full object-cover group-hover:ring-2 group-hover:ring-[#EFDA1C] transition-all"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-white font-semibold group-hover:text-[#EFDA1C] transition-colors">
                                                    {selectedNFT.owner.name}
                                                </div>
                                                <div className="text-gray-400 group-hover:text-white transition-colors">
                                                    @{selectedNFT.owner.username}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-[#EFDA1C] font-bold text-2xl">{selectedNFT.price} ETH</div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleLike(selectedNFT.id)}
                                                    className="flex items-center gap-1 text-gray-400 hover:text-[#EFDA1C] transition-colors"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill={likedNFTs.includes(selectedNFT.id) ? "#EFDA1C" : "none"}
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                        />
                                                    </svg>
                                                    <span>{likedNFTs.includes(selectedNFT.id) ? selectedNFT.likes + 1 : selectedNFT.likes}</span>
                                                </button>
                                                <div className="flex items-center gap-1 text-gray-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span>{selectedNFT.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button 
                                                className="flex-1 bg-[#EFDA1C] text-black font-semibold py-3 rounded-xl hover:bg-[#EFDA1C]/90 transition-colors"
                                                onClick={() => handleNFTClick(selectedNFT.id)}
                                            >
                                                Buy Now
                                            </button>
                                            <button 
                                                className="flex-1 bg-stone-700 text-white font-semibold py-3 rounded-xl hover:bg-stone-600 transition-colors"
                                                onClick={() => handleNFTClick(selectedNFT.id)}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
} 