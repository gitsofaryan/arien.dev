import React from 'react';
import { NavLink } from 'react-router-dom';

const RightSidebar = () => {
    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Work', path: '/projects' },
        { label: 'Stories', path: '/blog' },
    ];

    return (
        <aside className="hidden md:flex w-[240px] bg-[#181818] border-l border-[#1f1f1f] flex-col h-full font-mono">
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
            </div>

            <div className="mt-auto p-6 text-xs text-vscode-text opacity-50">
                &copy; 2026 Aryan Jain
            </div>
        </aside>
    );
};

export default RightSidebar;
