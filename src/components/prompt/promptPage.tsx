'use client';
import { useState } from 'react';
import PromptCard from './PromptCard';
import Pagination from './Pagination';
import promptsData from '@/data/prompts.json';

export default function PromptPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const promptsPerPage = 6;
    const totalPrompts = promptsData.prompts.length;
    // const totalPages = Math.ceil(totalPrompts / promptsPerPage);

    const indexOfLastPrompt = currentPage * promptsPerPage;
    const indexOfFirstPrompt = indexOfLastPrompt - promptsPerPage;
    const currentPrompts = promptsData.prompts.slice(indexOfFirstPrompt, indexOfLastPrompt);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-stone-900">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#EFDA1C] to-[#00ffe0] text-transparent bg-clip-text">
                    AI Prompts Collection
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {currentPrompts.map((prompt) => (
                        <PromptCard
                            key={prompt.id}
                            id={prompt.id}
                            title={prompt.title}
                            content={prompt.content}
                            dateAdd={prompt.dateAdd}
                            creator={prompt.creator}
                            likes={prompt.likes}
                            tags={prompt.tags}
                            creatorImage={prompt.creatorImage}
                        />
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalItems={totalPrompts}
                    itemsPerPage={promptsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

