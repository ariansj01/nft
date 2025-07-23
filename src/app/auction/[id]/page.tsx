'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import auctionData from '@/data/auctions.json';

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [bidAmount, setBidAmount] = useState('');
    const [showBidHistory, setShowBidHistory] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [creatorImageError, setCreatorImageError] = useState(false);
    const [bidError, setBidError] = useState('');
    const [bidSuccess, setBidSuccess] = useState('');

    const auction = auctionData.auctions.find(a => a.id === parseInt(params.id));

    if (!auction) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Auction Not Found</h1>
                    <button 
                        onClick={() => router.push('/auction')}
                        className="px-6 py-3 bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-black rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Back to Auctions
                    </button>
                </div>
            </div>
        );
    }

    const formatTimeLeft = (endTime: string) => {
        const end = new Date(endTime);
        const now = new Date();
        const diff = end.getTime() - now.getTime();
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${days}d ${hours}h ${minutes}m left`;
    };

    const handleBid = (e: React.FormEvent) => {
        e.preventDefault();
        setBidError('');
        setBidSuccess('');

        const bidValue = parseFloat(bidAmount);
        
        if (isNaN(bidValue)) {
            setBidError('Please enter a valid bid amount');
            return;
        }

        if (bidValue <= auction.currentBid) {
            setBidError(`Bid must be higher than current bid (${auction.currentBid} ETH)`);
            return;
        }

        // In a real application, you would:
        // 1. Connect to your smart contract
        // 2. Call the placeBid function
        // 3. Wait for the transaction to be confirmed
        // 4. Update the UI accordingly

        // For now, we'll just simulate a successful bid
        setBidSuccess('Bid placed successfully!');
        setBidAmount('');
        
        // Update the current bid in the UI
        auction.currentBid = bidValue;
        auction.bids.unshift({
            bidder: "You",
            amount: bidValue,
            time: new Date().toISOString()
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-stone-900">
            <div className="container mx-auto px-4 py-12">
                <button 
                    onClick={() => router.push('/auction')}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Auctions
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column - NFT Image */}
                    <div className="relative h-[600px] rounded-2xl overflow-hidden bg-stone-800">
                        {!imageError ? (
                            <Image
                                src={auction.image}
                                alt={auction.title}
                                fill
                                className="object-cover"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-gray-400">Image not available</span>
                            </div>
                        )}
                        <div className="absolute top-4 right-4 bg-black/50 px-4 py-2 rounded-full text-white">
                            {formatTimeLeft(auction.endTime)}
                        </div>
                    </div>

                    {/* Right Column - Auction Details */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">{auction.title}</h1>
                            <div className="flex items-center gap-3 mb-6">
                                {!creatorImageError ? (
                                    <Image
                                        src={auction.creator.image}
                                        alt={auction.creator.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                        onError={() => setCreatorImageError(true)}
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center">
                                        <span className="text-gray-400">{auction.creator.name[0]}</span>
                                    </div>
                                )}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-white font-semibold">{auction.creator.name}</h3>
                                        {auction.creator.verified && (
                                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <p className="text-gray-400">{auction.category}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-stone-900 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-gray-400">Current Bid</p>
                                    <p className="text-3xl font-bold text-white">{auction.currentBid} ETH</p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Starting Price</p>
                                    <p className="text-xl text-white">{auction.startingPrice} ETH</p>
                                </div>
                            </div>

                            <form onSubmit={handleBid} className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 mb-2">Your Bid (ETH)</label>
                                    <input
                                        type="number"
                                        value={bidAmount}
                                        onChange={(e) => {
                                            setBidAmount(e.target.value);
                                            setBidError('');
                                            setBidSuccess('');
                                        }}
                                        min={auction.currentBid + 0.1}
                                        step="0.1"
                                        className="w-full bg-stone-800 text-white px-4 py-3 rounded-lg border border-stone-700 focus:outline-none focus:border-[#EFDA1C]"
                                        placeholder={`Minimum bid: ${auction.currentBid + 0.1} ETH`}
                                    />
                                </div>
                                {bidError && (
                                    <p className="text-red-500 text-sm">{bidError}</p>
                                )}
                                {bidSuccess && (
                                    <p className="text-green-500 text-sm">{bidSuccess}</p>
                                )}
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-black rounded-lg font-bold hover:opacity-90 transition-opacity"
                                >
                                    Place Bid
                                </button>
                            </form>
                        </div>

                        <div className="bg-stone-900 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-white">Bid History</h2>
                                <button
                                    onClick={() => setShowBidHistory(!showBidHistory)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {showBidHistory ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            
                            {showBidHistory && (
                                <div className="space-y-4">
                                    {auction.bids.map((bid, index) => (
                                        <div key={index} className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">
                                                    <span className="text-gray-400">{bid.bidder[0]}</span>
                                                </div>
                                                <div>
                                                    <p className="text-white">{bid.bidder}</p>
                                                    <p className="text-gray-400 text-sm">{new Date(bid.time).toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <p className="text-white font-semibold">{bid.amount} ETH</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-stone-900 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Properties</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(auction.properties).map(([key, value]) => (
                                    <div key={key} className="bg-stone-800 p-3 rounded-lg">
                                        <p className="text-gray-400 text-sm capitalize">{key}</p>
                                        <p className="text-white">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {auction.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="text-sm bg-stone-800 text-gray-300 px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 