import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Navbar from './Navbar';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [time, setTime] = useState(new Date());
    const location = useLocation();
    const navigate = useNavigate();

    // Define available tabs and their routes
    const allTabs = [
        { id: 'home', label: 'home.tsx', paths: ['/'] },
        { id: 'about', label: 'aryan.info', paths: ['/about'] },
        { id: 'work', label: 'work.done', paths: ['/projects'] },
        { id: 'stories', label: 'stories.read', paths: ['/blog'] }
    ];

    // State for open tabs (start with only the active tab)
    const [openTabIds, setOpenTabIds] = useState<string[]>(() => {
        const activeTab = allTabs.find(tab =>
            tab.paths.some(path => location.pathname === path || (path !== '/' && location.pathname.startsWith(path)))
        );
        return activeTab ? [activeTab.id] : [];
    });

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Effect: Auto-open tab when route changes
    useEffect(() => {
        const activeTab = allTabs.find(tab =>
            tab.paths.some(path => location.pathname === path || (path !== '/' && location.pathname.startsWith(path)))
        );
        if (activeTab && !openTabIds.includes(activeTab.id)) {
            setOpenTabIds(prev => [...prev, activeTab.id]);
        }
    }, [location.pathname]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
        e.stopPropagation(); // Prevent navigation on close
        const newTabs = openTabIds.filter(id => id !== tabId);
        setOpenTabIds(newTabs);

        // If we closed the active tab, navigate to another one
        const closingTab = allTabs.find(t => t.id === tabId);
        const isActive = closingTab?.paths.some(path => location.pathname === path || (path !== '/' && location.pathname.startsWith(path)));

        if (isActive && newTabs.length > 0) {
            // Navigate to the last opened tab
            const lastTabId = newTabs[newTabs.length - 1];
            const lastTab = allTabs.find(t => t.id === lastTabId);
            if (lastTab) navigate(lastTab.paths[0]);
        } else if (isActive && newTabs.length === 0) {
            navigate('/'); // Fallback or could stay on "empty" state (we will handle empty state in render)
        }
    };

    // Check if current route corresponds to an open tab
    const isAnyTabOpen = openTabIds.length > 0;
    // We only show content if the current active "file" is actually open. 
    // However, in a real SPA handling "empty state" while actively on a route is tricky without changing route.
    // For this portfolio, if "no tabs are open", we can visually mask the content or show a placeholder, 
    // even if the URL is technically at a route.
    // Let's rely on openTabIds. If the active route's tab isn't open, we effectively show the "empty" background.

    const activeTab = allTabs.find(tab =>
        tab.paths.some(path => location.pathname === path || (path !== '/' && location.pathname.startsWith(path)))
    );
    const showContent = activeTab && openTabIds.includes(activeTab.id);

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
                    <div className="hidden md:flex h-14 border-b border-[#1f1f1f] bg-[#1F1F1F] items-center justify-between px-6 shrink-0 select-none">
                        {/* Tabs */}
                        <div className="flex gap-1 text-sm overflow-x-auto">
                            {openTabIds.map(tabId => {
                                const tab = allTabs.find(t => t.id === tabId);
                                if (!tab) return null;

                                const isActive = tab.paths.some(path => location.pathname === path || (path !== '/' && location.pathname.startsWith(path)));

                                return (
                                    <div
                                        key={tab.id}
                                        onClick={() => navigate(tab.paths[0])}
                                        className={`
                                            group relative flex items-center gap-2 px-4 py-2 min-w-[120px] cursor-pointer transition-colors border-r border-[#1f1f1f]/50
                                            ${isActive ? 'bg-[#1F1F1F] text-white' : 'bg-[#151515] text-gray-500 hover:bg-[#1a1a1a]'}
                                        `}
                                    >
                                        <span className="truncate">{tab.label}</span>
                                        {/* Active Indicator Line */}
                                        {isActive && (
                                            <div className="absolute top-0 left-0 w-full h-[1px] bg-vscode-accent"></div>
                                        )}

                                        {/* Close Button (visible on hover or active) */}
                                        <span
                                            onClick={(e) => handleCloseTab(e, tab.id)}
                                            className={`
                                                ml-auto p-0.5 rounded-sm hover:bg-[#333] opacity-0 group-hover:opacity-100 transition-opacity
                                                ${isActive ? 'opacity-100' : ''}
                                            `}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Status Info */}
                        <div className="flex items-center gap-6 text-xs font-medium tracking-wide">
                            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                Open to new work
                            </div>
                            <div className="text-gray-500 max-w-[100px] truncate">Jabalpur, India</div>
                            <div className="text-gray-500 flex items-center gap-2 whitespace-nowrap">
                                * My time: {formatTime(time)}
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-[#1f1f1f] scrollbar-track-transparent bg-[#1F1F1F]">
                        {showContent ? (
                            <>
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
                            </>
                        ) : (
                            // Empty Editor State
                            <div className="flex flex-col items-center justify-center h-full text-[#333] select-none">
                                <div className="mb-4 opacity-20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
                                </div>
                                <p className="text-sm font-mono">No files open</p>
                                <p className="text-xs font-mono mt-2 text-[#444]">Select a file from the sidebar explorer</p>
                            </div>
                        )}
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
