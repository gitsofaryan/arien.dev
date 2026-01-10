import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useOS } from '@/context/OSContext';
import { Monitor, Music, Gamepad2 } from 'lucide-react';

const RightSidebar = () => {
    const { theme, setTheme } = useTheme();
    const { launchApp } = useOS();
    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Work', path: '/projects' },
        { label: 'Stories', path: '/blog' },
    ];

    return (
        <aside className="hidden md:flex w-[240px] bg-vscode-sidebar border-l border-vscode-border flex-col h-full font-mono transition-colors duration-300">
            <div className="p-6">
                <h3 className="text-vscode-text font-bold uppercase text-xs tracking-wider mb-6 border-b border-vscode-border pb-2">
                    Index
                </h3>
                <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors hover:text-white ${isActive ? 'text-vscode-accent' : 'text-vscode-text'
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <h3 className="text-vscode-text font-bold uppercase text-xs tracking-wider mt-8 mb-6 border-b border-vscode-border pb-2">
                    Themes
                </h3>
                <div className="flex flex-col gap-2">
                    {['dark', 'retro', 'markdown', 'spatial'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTheme(t as any)}
                            className={`text-left text-sm font-medium transition-colors px-2 py-1 rounded
                                ${theme === t
                                    ? 'bg-vscode-accent/10 text-vscode-accent border-l-2 border-vscode-accent'
                                    : 'text-vscode-text hover:text-white hover:bg-vscode-highlight'
                                }`}
                        >
                            <span className="capitalize">{t}</span>
                        </button>
                    ))}
                </div>

                <h3 className="text-vscode-text font-bold uppercase text-xs tracking-wider mt-8 mb-6 border-b border-vscode-border pb-2">
                    Apps
                </h3>
                <div className="flex flex-col gap-2">
                    {[
                        // { id: 'computer', label: 'My Computer', icon: Monitor },
                        { id: 'spotify', label: 'Spotify', icon: Music },
                        { id: 'games', label: 'Tic-Tac-Toe', icon: Gamepad2 }
                    ].map((app) => (
                        <button
                            key={app.id}
                            onClick={() => launchApp(app.id)}
                            className={`flex items-center gap-2 text-left text-sm font-medium transition-colors px-2 py-1 rounded text-vscode-text hover:text-white hover:bg-vscode-highlight`}
                        >
                            <app.icon size={14} className={app.id === 'spotify' ? 'text-green-400' : app.id === 'games' ? 'text-purple-400' : 'text-blue-400'} />
                            <span className="capitalize">{app.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-auto p-6 text-xs text-vscode-text opacity-50">
                &copy; 2026 Aryan Jain
            </div>
        </aside>
    );
};

export default RightSidebar;
