'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-stone-900">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/CardIMG-1.svg"
                        alt="About Us Hero"
                        fill
                        className="object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative h-full flex items-center justify-center text-center px-4"
                >
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Us</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Empowering artists and collectors in the digital art revolution
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                {/* Mission Section */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24"
                >
                    <motion.div variants={fadeInUp}>
                        <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                        <p className="text-gray-300 text-lg mb-6">
                            We&apos;re dedicated to revolutionizing the digital art space by providing a secure, 
                            transparent, and user-friendly platform for artists and collectors to connect, 
                            trade, and showcase their work.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#EFDA1C] rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <p className="text-gray-300">Empowering digital artists worldwide</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#EFDA1C] rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <p className="text-gray-300">Secure and transparent transactions</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="relative h-[400px]">
                        <Image
                            src="/images/CardIMG-2.svg"
                            alt="Our Mission"
                            fill
                            className="object-cover rounded-2xl"
                        />
                    </motion.div>
                </motion.div>

                {/* Team Section */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white mb-12">Our Team</motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "John Doe", role: "CEO & Founder", image: "/images/User.svg" },
                            { name: "Jane Smith", role: "CTO", image: "/images/User2.svg" },
                            { name: "Mike Johnson", role: "Head of Design", image: "/images/User3.svg" }
                        ].map((member, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="group"
                            >
                                <div className="relative h-64 mb-4 overflow-hidden rounded-2xl">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                                <p className="text-gray-400">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
                >
                    {[
                        { number: "10K+", label: "Active Users" },
                        { number: "50K+", label: "NFTs Listed" },
                        { number: "$100M+", label: "Total Volume" },
                        { number: "100+", label: "Countries" }
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-stone-800 rounded-2xl p-6 text-center hover:shadow-[#EFDA1C]/20 transition-all duration-300"
                        >
                            <h3 className="text-3xl font-bold text-[#EFDA1C] mb-2">{stat.number}</h3>
                            <p className="text-gray-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Values Section */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            title: "Innovation",
                            description: "We constantly push boundaries to create the best experience for our users",
                            icon: "M13 10V3L4 14h7v7l9-11h-7z"
                        },
                        {
                            title: "Community",
                            description: "Building a strong and supportive community is at our core",
                            icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        },
                        {
                            title: "Transparency",
                            description: "We believe in open and honest communication with our users",
                            icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        }
                    ].map((value, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            className="bg-stone-800 rounded-2xl p-6 hover:shadow-[#EFDA1C]/20 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-[#EFDA1C] rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                            <p className="text-gray-400">{value.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
} 