import React, { useState } from 'react';
import MacWindow from './MacWindow';
import MyComputer from './apps/MyComputer';
import Spotify from './apps/Spotify';
import Games from './apps/Games';
import { Monitor, Music, Gamepad2 } from 'lucide-react';

import { useOS } from '@/context/OSContext';

const MacDesktop = () => {
    const { openApps, focusedApp, closeApp, toggleApp } = useOS();

    // Mapping for proper z-index and focus handling
    const isFocused = (appId: string) => focusedApp === appId;

    return (
        <div id="mac-desktop-overlay" className="fixed inset-0 z-[100] pointer-events-none overflow-hidden font-sans">
            {/* Windows Container - Full Screen */}
            <div className="relative w-full h-full">

                {/* Windows */}
                <div className="relative w-full h-full max-w-7xl mx-auto">

                    {/* My Computer */}
                    <MacWindow
                        title="My Computer"
                        isOpen={openApps.includes('computer')}
                        onClose={() => closeApp('computer')}
                        defaultPosition={{ x: 50, y: 50 }}
                        icon={<Monitor size={14} className="text-blue-400" />}
                        zIndex={isFocused('computer') ? 50 : 10}
                        onClick={() => toggleApp('computer')}
                    >
                        <MyComputer />
                    </MacWindow>

                    {/* Spotify */}
                    <MacWindow
                        title="Spotify"
                        isOpen={openApps.includes('spotify')}
                        onClose={() => closeApp('spotify')}
                        defaultPosition={{ x: 150, y: 150 }} // Staggered
                        icon={<Music size={14} className="text-green-400" />}
                        zIndex={isFocused('spotify') ? 51 : 20}
                        onClick={() => toggleApp('spotify')}
                    >
                        <Spotify />
                    </MacWindow>

                    {/* Games */}
                    <MacWindow
                        title="Games"
                        isOpen={openApps.includes('games')}
                        onClose={() => closeApp('games')}
                        defaultPosition={{ x: 300, y: 100 }} // Staggered
                        icon={<Gamepad2 size={14} className="text-purple-400" />}
                        zIndex={isFocused('games') ? 52 : 30}
                        onClick={() => toggleApp('games')}
                    >
                        <Games />
                    </MacWindow>

                </div>
            </div>

        </div>
    );
};

export default MacDesktop;

