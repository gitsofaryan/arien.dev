import React, { useState } from 'react';
import MacWindow from './MacWindow';
import Spotify from './apps/Spotify';
import Games from './apps/Games';
import SpeedMaster from './apps/SpeedMaster';
import Hawkins from './apps/Hawkins';
import { Music, Gamepad2, Keyboard, Tv } from 'lucide-react';

import { useOS } from '@/context/OSContext';

const MacDesktop = () => {
    const { openApps, focusedApp, closeApp, toggleApp, focusApp } = useOS();

    // Mapping for proper z-index and focus handling
    const isFocused = (appId: string) => focusedApp === appId;

    // Mobile detection helper
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div id="mac-desktop-overlay" className="fixed inset-0 z-[100] pointer-events-none overflow-hidden font-sans">
            {/* Windows Container - Full Screen */}
            <div className="relative w-full h-full">

                {/* Windows */}
                <div className="relative w-full h-full max-w-7xl mx-auto">

                    {/* Spotify */}
                    <MacWindow
                        title="Spotify"
                        isOpen={openApps.includes('spotify')}
                        onClose={() => closeApp('spotify')}
                        defaultPosition={{ x: isMobile ? 0 : 650, y: isMobile ? 40 : 200 }}
                        defaultSize={{ width: isMobile ? window.innerWidth : 375, height: isMobile ? window.innerHeight - 100 : 600 }}
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
                        defaultPosition={{ x: isMobile ? 0 : 700, y: isMobile ? 60 : 250 }}
                        defaultSize={{ width: isMobile ? window.innerWidth : 375, height: isMobile ? window.innerHeight - 100 : 600 }}
                        icon={<Gamepad2 size={14} className="text-purple-400" />}
                        zIndex={isFocused('games') ? 52 : 30}
                        onClick={() => toggleApp('games')}
                    >
                        <Games />
                    </MacWindow>

                    {/* SpeedMaster */}
                    <MacWindow
                        title="SpeedMaster"
                        isOpen={openApps.includes('speedmaster')}
                        onClose={() => closeApp('speedmaster')}
                        defaultPosition={{ x: isMobile ? 0 : 100, y: isMobile ? 80 : 100 }}
                        defaultSize={{ width: isMobile ? window.innerWidth : 600, height: isMobile ? window.innerHeight - 200 : 400 }}
                        icon={<Keyboard size={14} className="text-yellow-400" />}
                        zIndex={isFocused('speedmaster') ? 53 : 30}
                        onClick={() => toggleApp('speedmaster')}
                    >
                        <SpeedMaster />
                    </MacWindow>

                    {/* Hawkins - Stranger Things App */}
                    {openApps.includes('hawkins') && (
                        <MacWindow
                            title="Hawkins"
                            icon={<Tv size={14} className="text-red-400" />}
                            defaultPosition={{ x: isMobile ? 0 : 150, y: isMobile ? 50 : 150 }}
                            defaultSize={{
                                width: isMobile ? window.innerWidth : 800,
                                height: isMobile ? window.innerHeight - 100 : 500
                            }}
                            isOpen={openApps.includes('hawkins')}
                            onClose={() => closeApp('hawkins')}
                            zIndex={isFocused('hawkins') ? 54 : 40}
                            onClick={() => toggleApp('hawkins')}
                        >
                            <Hawkins />
                        </MacWindow>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MacDesktop;
