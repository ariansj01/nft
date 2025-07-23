'use client';
import { useState } from 'react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const [pageInput, setPageInput] = useState(currentPage.toString());

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
            setPageInput(page.toString());
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPageInput(value);
        
        const page = parseInt(value);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-center gap-4 mt-8">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-stone-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-700 transition-colors"
            >
                Previous
            </button>
            
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={pageInput}
                    onChange={handleInputChange}
                    min={1}
                    max={totalPages}
                    className="w-16 px-2 py-1 rounded-lg bg-stone-800 text-white text-center"
                />
                <span className="text-gray-400">of {totalPages}</span>
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-stone-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-700 transition-colors"
            >
                Next
            </button>
        </div>
    );
} 