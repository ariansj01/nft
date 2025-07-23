'use client';
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface PromptCardProps {
    id: number;
    title: string;
    content: string;
    dateAdd: string;
    creator: string;
    likes: number;
    tags: string[];
    creatorImage: string;
}

export default function PromptCard({ 
    id,
    title, 
    content, 
    dateAdd, 
    creator, 
    likes, 
    tags,
    creatorImage 
}: PromptCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [currentLikes, setCurrentLikes] = useState(likes);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation when clicking like button
        setIsLiked(!isLiked);
        setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
        <Link href={`/prompt/${id}`} className="block">
            <div className="bg-stone-900 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text">
                            {title}
                        </h2>
                        <small className="text-sm text-gray-500">{dateAdd}</small>
                    </div>
                    
                    <p className="text-gray-300 line-clamp-3">{content}</p>
                    
                    <div className="flex items-center gap-2">
                        <Image 
                            src={creatorImage} 
                            alt="creator" 
                            width={30} 
                            height={30} 
                            className="rounded-full"
                        />
                        <span className="text-gray-400">{creator}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handleLike}
                            className="flex items-center gap-1 transition-colors"
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
                            <span className="font-medium">{currentLikes} likes</span>
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span 
                                key={tag}
                                className="text-sm bg-opacity-20 backdrop-blur-sm bg-white/30 px-2 py-1 rounded-md text-gray-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
} 