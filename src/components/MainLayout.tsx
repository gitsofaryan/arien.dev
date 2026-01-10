import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import Navbar from './Navbar';
import { GitBranch, Star, Layout, X, Menu, Music, Gamepad2, Keyboard, Tv, MessageCircle } from 'lucide-react';
import MacDesktop from './mac/MacDesktop';
import { useTheme } from '@/context/ThemeContext';
import { useOS } from '@/context/OSContext';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { launchApp } = useOS();
    const navigate = useNavigate();
    const location = useLocation();

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navItems = [
        { label: 'Home', path: '/', icon: Layout },
        { label: 'About', path: '/about', icon: Star },
        { label: 'Work', path: '/projects', icon: GitBranch }, // Added icon for Work/Projects
        { label: 'Stories', path: '/blog', icon: MessageCircle },
    ];

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-50 p-2 bg-vscode-sidebar/90 backdrop-blur-md rounded-lg border border-vscode-border shadow-lg text-vscode-text"
            >
                <Menu size={24} />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            )}

            {/* Drawer */}
            <div className={`fixed inset-y-0 left-0 z-[70] w-[80%] max-w-[300px] bg-vscode-sidebar border-r border-vscode-border transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Header */}
                <div className="p-6 border-b border-vscode-border flex items-center justify-between">
                    <span className="font-bold text-lg text-vscode-text">Menu</span>
                    <button onClick={() => setIsOpen(false)} className="text-vscode-text/60 hover:text-vscode-text">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Navigation */}
                    <nav className="space-y-4">
                        <h3 className="text-xs uppercase tracking-wider text-vscode-text/50 font-bold">Navigation</h3>
                        {navItems.map(item => (
                            <button
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    setIsOpen(false);
                                }}
                                className={`flex items-center gap-3 w-full text-left p-2 rounded transition-colors ${location.pathname === item.path ? 'bg-vscode-accent/10 text-vscode-accent' : 'text-vscode-text hover:bg-vscode-highlight'}`}
                            >
                                <item.icon size={18} />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Apps */}
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase tracking-wider text-vscode-text/50 font-bold">Apps</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                { id: 'spotify', label: 'Spotify', icon: Music, color: 'text-green-400' },
                                { id: 'games', label: 'Games', icon: Gamepad2, color: 'text-purple-400' },
                                { id: 'speedmaster', label: 'Typing', icon: Keyboard, color: 'text-yellow-400' },
                                { id: 'hawkins', label: 'Hawkins', icon: Tv, color: 'text-red-400' }
                            ].map((app) => (
                                <button
                                    key={app.id}
                                    onClick={() => {
                                        launchApp(app.id);
                                        setIsOpen(false);
                                    }}
                                    className="flex flex-col items-center justify-center p-3 rounded bg-vscode-bg border border-vscode-border hover:border-vscode-accent/50 transition-all aspect-square"
                                >
                                    <app.icon size={24} className={app.color} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Themes */}
                    <div className="space-y-4">
                        <h3 className="text-xs uppercase tracking-wider text-vscode-text/50 font-bold">Themes</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {['dark', 'retro', 'markdown', 'spatial', 'pixel'].map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTheme(t as any)}
                                    className={`px-3 py-2 rounded text-xs font-medium capitalize border transition-colors ${theme === t ? 'bg-vscode-accent text-vscode-bg border-vscode-accent' : 'bg-vscode-bg border-vscode-border text-vscode-text hover:border-vscode-accent/50'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-vscode-border text-xs text-vscode-text/40">
                    &copy; 2026 Aryan Jain
                </div>
            </div>
        </div>
    );
};

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

    // State for open tabs
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
        e.stopPropagation();
        const newTabs = openTabIds.filter(id => id !== tabId);
        setOpenTabIds(newTabs);

        const closingTab = allTabs.find(t => t.id === tabId);
        const isActive = closingTab?.paths.some(path => location.pathname === path || (path !== '/' && location.pathname.startsWith(path)));

        if (isActive && newTabs.length > 0) {
            const lastTabId = newTabs[newTabs.length - 1];
            const lastTab = allTabs.find(t => t.id === lastTabId);
            if (lastTab) navigate(lastTab.paths[0]);
        } else if (isActive && newTabs.length === 0) {
            navigate('/');
        }
    };

    const activeTab = allTabs.find(tab =>
        tab.paths.some(path => location.pathname === path || (path !== '/' && location.pathname.startsWith(path)))
    );
    const showContent = activeTab && openTabIds.includes(activeTab.id);

    return (
        <div className="min-h-screen bg-vscode-bg text-vscode-text font-mono selection:bg-vscode-accent selection:text-vscode-bg flex flex-col md:flex-row overflow-hidden transition-colors duration-300">

            {/* Mobile Hamburger Menu */}
            <MobileMenu />

            {/* NB: Navbar removed on mobile as per user request to use Hamburger only */}

            {/* Desktop Grid Layout */}
            <div className="flex-1 flex flex-col md:flex-row h-screen overflow-hidden">

                {/* Left Sidebar (Desktop Only) */}
                <div className="hidden md:block h-full shrink-0">
                    <LeftSidebar />
                </div>

                {/* Center Panel (Main Content) */}
                <main
                    className="flex-1 h-full overflow-hidden flex flex-col bg-vscode-bg relative shadow-2xl z-10 transition-colors duration-300"
                    style={{
                        backgroundImage: 'var(--vscode-bg-image, none)',
                        backgroundSize: 'var(--vscode-bg-size, cover)'
                    }}
                >
                    {/* Top Status Bar (Desktop Only) */}
                    <div className="hidden md:flex h-14 border-b border-vscode-border bg-vscode-bg items-center justify-between px-6 shrink-0 select-none transition-colors duration-300">
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
                                            group relative flex items-center gap-2 px-4 py-2 min-w-[120px] cursor-pointer transition-colors border-r border-vscode-border/50
                                            ${isActive ? 'bg-vscode-bg text-vscode-text' : 'bg-vscode-sidebar text-vscode-text/70 hover:bg-vscode-highlight'}
                                        `}
                                    >
                                        <span className="truncate">{tab.label}</span>
                                        {isActive && (
                                            <div className="absolute top-0 left-0 w-full h-[1px] bg-vscode-accent"></div>
                                        )}
                                        <span
                                            onClick={(e) => handleCloseTab(e, tab.id)}
                                            className={`ml-auto p-0.5 rounded-sm hover:bg-vscode-highlight opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Status Info */}
                        <div className="flex items-center gap-6 text-xs font-medium tracking-wide text-vscode-text/80">
                            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                Open to new work
                            </div>
                            <div className="text-vscode-text/60 max-w-[100px] truncate">Jabalpur, India</div>
                            <div className="text-vscode-text/60 flex items-center gap-2 whitespace-nowrap">
                                * My time: {formatTime(time)}
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-vscode-border scrollbar-track-transparent bg-vscode-bg transition-colors duration-300">
                        {showContent ? (
                            <>
                                <div className="hidden md:block absolute left-0 top-0 bottom-0 w-12 text-right pr-3 pt-8 text-vscode-text/30 font-mono text-xs select-none pointer-events-none">
                                    {Array.from({ length: 100 }).map((_, i) => (
                                        <div key={i} className="leading-[1.8]">{i + 1}</div>
                                    ))}
                                </div>
                                <div className="md:pl-16 p-8 md:p-12 max-w-5xl mx-auto min-h-full">
                                    {children}
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-vscode-text/50 select-none">
                                <div className="mb-4 opacity-20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
                                </div>
                                <p className="text-sm font-mono">No files open</p>
                                <p className="text-xs font-mono mt-2 text-vscode-text/40">Select a file from the sidebar explorer</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* Right Sidebar (Desktop Only) */}
                <div className="hidden md:block h-full shrink-0">
                    <RightSidebar />
                </div>
            </div>

            {/* Global Mac Desktop Overlay */}
            <MacDesktop />
        </div>
    );
};

export default MainLayout;
