'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isMinimized, setIsMinimized] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: messages.length + 2,
                text: "I'm processing your request. This is a simulated response. In a real implementation, this would connect to an AI service.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-stone-900">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">AI Assistant</h1>
                    <p className="text-gray-400 text-lg">Chat with our intelligent AI assistant</p>
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative max-w-4xl mx-auto"
                >
                    {/* Chat Window */}
                    <div className={`bg-stone-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
                        isMinimized ? 'h-20' : 'h-[600px]'
                    }`}>
                        {/* Header */}
                        <div 
                            className="bg-stone-700 p-4 flex items-center justify-between cursor-pointer"
                            onClick={() => setIsMinimized(!isMinimized)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10">
                                    <Image
                                        src="/images/ai-avatar.jpg"
                                        alt="AI Assistant"
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">AI Assistant</h3>
                                    <p className="text-gray-400 text-sm">Always here to help</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-[calc(100%-120px)] overflow-y-auto p-4 space-y-4">
                            <AnimatePresence>
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[80%] rounded-2xl p-4 ${
                                            message.sender === 'user'
                                                ? 'bg-[#EFDA1C] text-black'
                                                : 'bg-stone-700 text-white'
                                        }`}>
                                            <p className="text-sm">{message.text}</p>
                                            <span className="text-xs opacity-50 mt-1 block">
                                                {message.timestamp.toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-stone-700 rounded-2xl p-4">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-stone-800 border-t border-stone-700">
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-stone-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EFDA1C]"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="bg-[#EFDA1C] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#EFDA1C]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-stone-800 rounded-2xl p-6 hover:shadow-[#EFDA1C]/20 transition-all duration-300">
                            <div className="w-12 h-12 bg-[#EFDA1C] rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold mb-2">Smart Responses</h3>
                            <p className="text-gray-400">Get intelligent and contextual responses to your queries</p>
                        </div>
                        <div className="bg-stone-800 rounded-2xl p-6 hover:shadow-[#EFDA1C]/20 transition-all duration-300">
                            <div className="w-12 h-12 bg-[#EFDA1C] rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold mb-2">24/7 Availability</h3>
                            <p className="text-gray-400">Our AI assistant is always ready to help you anytime</p>
                        </div>
                        <div className="bg-stone-800 rounded-2xl p-6 hover:shadow-[#EFDA1C]/20 transition-all duration-300">
                            <div className="w-12 h-12 bg-[#EFDA1C] rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold mb-2">Secure & Private</h3>
                            <p className="text-gray-400">Your conversations are encrypted and kept private</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
} 