'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import promptsData from '@/data/prompts.json';

// interface PromptDetail {
//     id: number;
//     title: string;
//     content: string;
//     dateAdd: string;
//     creator: string;
//     likes: number;
//     tags: string[];
//     creatorImage: string;
//     description: string;
//     examples: string[];
//     tips: string[];
//     usageCount: number;
//     rating: number;
// }

export default function PromptDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(0);

    const prompt = promptsData.prompts.find(p => p.id === parseInt(params.id));

    if (!prompt) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-500 mb-4">Prompt Not Found</h1>
                    <button 
                        onClick={() => router.push('/prompt')}
                        className="px-6 py-3 bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-black rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Back to Prompts
                    </button>
                </div>
            </div>
        );
    }

    const handleLike = () => {
        setIsLiked(!isLiked);
        setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-stone-900">
            <div className="container mx-auto px-4 py-12">
                <button 
                    onClick={() => router.push('/prompt')}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Prompts
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-stone-900 rounded-2xl p-8 mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text">
                                    {prompt.title}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={handleLike}
                                        className="flex items-center gap-2 transition-colors"
                                    >
                                        <svg 
                                            className={`w-6 h-6 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'hover:fill-red-500 hover:text-red-500'}`}
                                            fill={isLiked ? "currentColor" : "none"}
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
                                        <span className="font-medium">{prompt.likes + currentLikes} likes</span>
                                    </button>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none">
                                <p className="text-gray-300 text-lg mb-8">{prompt.content}</p>
                                
                                <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
                                <p className="text-gray-400 mb-8">{prompt.description}</p>

                                <h2 className="text-2xl font-bold text-white mb-4">Examples</h2>
                                <ul className="list-disc list-inside text-gray-400 mb-8">
                                    {prompt.examples.map((example, index) => (
                                        <li key={index} className="mb-2">{example}</li>
                                    ))}
                                </ul>

                                <h2 className="text-2xl font-bold text-white mb-4">Tips</h2>
                                <ul className="list-disc list-inside text-gray-400">
                                    {prompt.tips.map((tip, index) => (
                                        <li key={index} className="mb-2">{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-stone-900 rounded-2xl p-6 sticky top-8">
                            <div className="flex items-center gap-4 mb-6">
                                <Image 
                                    src={prompt.creatorImage} 
                                    alt="creator" 
                                    width={50} 
                                    height={50} 
                                    className="rounded-full"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-white">{prompt.creator}</h3>
                                    <p className="text-gray-400">Prompt Creator</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-400">Date Added</p>
                                    <p className="text-white">{prompt.dateAdd}</p>
                                </div>

                                <div>
                                    <p className="text-gray-400">Usage Count</p>
                                    <p className="text-white">{prompt.usageCount} times</p>
                                </div>

                                <div>
                                    <p className="text-gray-400">Rating</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-5 h-5 ${i < Math.floor(prompt.rating) ? 'text-yellow-400' : 'text-gray-400'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-white">{prompt.rating}</span>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-gray-400 mb-2">Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {prompt.tags.map((tag) => (
                                            <span 
                                                key={tag}
                                                className="text-sm bg-opacity-20 backdrop-blur-sm bg-white/30 px-3 py-1 rounded-md text-gray-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-black rounded-lg font-bold hover:opacity-90 transition-opacity">
                                    Use This Prompt
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 