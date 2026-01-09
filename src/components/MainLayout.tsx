import React, { useState, useEffect } from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Navbar from './Navbar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="min-h-screen bg-[#000000] text-white font-mono selection:bg-green-900 selection:text-white flex flex-col md:flex-row overflow-hidden">

            {/* Mobile Header */}
            <div className="md:hidden">
                <Navbar />
            </div>

            {/* Desktop Grid Layout */}
            <div className="flex-1 flex flex-col md:flex-row h-screen overflow-hidden">

                {/* Left Sidebar */}
                <div className="hidden md:block h-full shrink-0">
                    <LeftSidebar />
                </div>

                {/* Center Panel (Main Content) */}
                <main className="flex-1 h-full overflow-hidden flex flex-col bg-[#1F1F1F] relative shadow-2xl z-10">
                    {/* Top Status Bar */}
                    <div className="hidden md:flex h-14 border-b border-[#1f1f1f] bg-[#1F1F1F] items-center justify-between px-6 shrink-0">
                        {/* Tabs */}
                        <div className="flex gap-8 text-sm">
                            <div className="relative text-white font-medium cursor-pointer">
                                aryan.info
                                <div className="absolute -bottom-[19px] left-0 w-full h-[2px] bg-[#f0f0f0]"></div>
                            </div>
                            <div className="text-gray-500 hover:text-gray-300 cursor-pointer transition-colors">work.done</div>
                        </div>

                        {/* Status Info */}
                        <div className="flex items-center gap-6 text-xs font-medium tracking-wide">
                            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                Open to new work
                            </div>
                            <div className="text-gray-500">Jabalpur, India</div>
                            <div className="text-gray-500 flex items-center gap-2">
                                {/* <div className="w-1 h-1 bg-gray-500 rounded-full"></div> */}
                                * My time: {formatTime(time)}
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-[#1f1f1f] scrollbar-track-transparent">
                        {/* Line Numbers */}
                        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-12 text-right pr-3 pt-8 text-[#333] font-mono text-xs select-none pointer-events-none">
                            {Array.from({ length: 100 }).map((_, i) => (
                                <div key={i} className="leading-[1.8]">{i + 1}</div>
                            ))}
                        </div>

                        {/* Content with padding for line numbers */}
                        <div className="md:pl-16 p-8 md:p-12 max-w-5xl mx-auto min-h-full">
                            {children}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar */}
                <div className="hidden md:block h-full shrink-0">
                    <RightSidebar />
                </div>

            </div>
        </div>
    );
};

export default MainLayout;
