import React from 'react';
import { Monitor, Music, Gamepad2 } from 'lucide-react';

interface DockProps {
    onAppClick: (appId: string) => void;
    activeApps: string[];
}

const Dock: React.FC<DockProps> = ({ onAppClick, activeApps }) => {
    const apps = [
        { id: 'computer', label: 'My Computer', icon: Monitor, color: 'text-blue-400' },
        { id: 'spotify', label: 'Spotify', icon: Music, color: 'text-green-400' },
        { id: 'games', label: 'Games', icon: Gamepad2, color: 'text-purple-400' },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[60]">
            <div className="flex items-end gap-3 px-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105">
                {apps.map((app) => (
                    <button
                        key={app.id}
                        onClick={() => onAppClick(app.id)}
                        className="group relative flex flex-col items-center gap-1 transition-all duration-300 hover:-translate-y-2"
                    >
                        {/* Label Tooltip */}
                        <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                            {app.label}
                        </span>

                        {/* Icon Container */}
                        <div className={`
                            w-12 h-12 md:w-14 md:h-14 rounded-xl bg-vscode-sidebar border border-vscode-border flex items-center justify-center shadow-lg transition-all
                            ${activeApps.includes(app.id) ? 'border-b-2 border-b-vscode-accent' : ''}
                            hover:bg-vscode-highlight
                        `}>
                            <app.icon className={`w-6 h-6 md:w-8 md:h-8 ${app.color}`} />
                        </div>

                        {/* Active Dot indicator */}
                        {activeApps.includes(app.id) && (
                            <div className="w-1 h-1 rounded-full bg-vscode-text mt-1 opacity-60"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dock;
