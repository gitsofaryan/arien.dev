import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OSContextType {
    openApps: string[];
    focusedApp: string | null;
    launchApp: (appId: string) => void;
    closeApp: (appId: string) => void;
    focusApp: (appId: string) => void;
    toggleApp: (appId: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [openApps, setOpenApps] = useState<string[]>([]);
    const [focusedApp, setFocusedApp] = useState<string | null>(null);

    const launchApp = (appId: string) => {
        if (!openApps.includes(appId)) {
            setOpenApps(prev => [...prev, appId]);
        }
        setFocusedApp(appId);

        // Scroll to bottom of home page where MacDesktop is located (optional simple hack)
        const macSection = document.getElementById('mac-desktop-section');
        if (macSection) {
            macSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const closeApp = (appId: string) => {
        setOpenApps(prev => prev.filter(id => id !== appId));
        if (focusedApp === appId) {
            setFocusedApp(prev => {
                const remaining = openApps.filter(id => id !== appId);
                return remaining.length > 0 ? remaining[remaining.length - 1] : null;
            });
        }
    };

    const focusApp = (appId: string) => {
        setFocusedApp(appId);
    };

    const toggleApp = (appId: string) => {
        if (openApps.includes(appId)) {
            if (focusedApp === appId) {
                // If active, maybe minimize? For now just keep focused.
                // Or maybe toggle minimize (remove from focused but keep in open?)
                // Let's just focus for now.
                setFocusedApp(appId);
            } else {
                setFocusedApp(appId);
            }
        } else {
            launchApp(appId);
        }
    };

    return (
        <OSContext.Provider value={{ openApps, focusedApp, launchApp, closeApp, focusApp, toggleApp }}>
            {children}
        </OSContext.Provider>
    );
};

export const useOS = () => {
    const context = useContext(OSContext);
    if (context === undefined) {
        throw new Error('useOS must be used within an OSProvider');
    }
    return context;
};
