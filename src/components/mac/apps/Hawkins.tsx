import React, { useEffect, useState, useRef } from 'react';

// --- Graph Types ---
type NodeId = string;

interface Point {
    x: number; // Percentages 0.0 - 1.0
    y: number;
}

interface Node extends Point {
    id: NodeId;
    neighbors: NodeId[];
}

interface RoadNetwork {
    [key: string]: Node;
}

// --- Road Network Definition (Percentage Based 0.0 - 1.0) ---
// Keeps characters aligned regardless of window size
const NETWORK: RoadNetwork = {
    // Top Horizontal
    'TL': { id: 'TL', x: 0.15, y: 0.25, neighbors: ['TM', 'ML'] },
    'TM': { id: 'TM', x: 0.50, y: 0.25, neighbors: ['TL', 'TR', 'C'] },
    'TR': { id: 'TR', x: 0.85, y: 0.25, neighbors: ['TM', 'MR'] },

    // Middle Horizontal
    'ML': { id: 'ML', x: 0.15, y: 0.55, neighbors: ['TL', 'BL', 'C'] },
    'C': { id: 'C', x: 0.50, y: 0.55, neighbors: ['TM', 'BM', 'ML', 'MR'] },
    'MR': { id: 'MR', x: 0.85, y: 0.55, neighbors: ['TR', 'BR', 'C'] },

    // Bottom Horizontal
    'BL': { id: 'BL', x: 0.15, y: 0.80, neighbors: ['ML', 'BM'] },
    'BM': { id: 'BM', x: 0.50, y: 0.80, neighbors: ['BL', 'BR', 'C'] },
    'BR': { id: 'BR', x: 0.85, y: 0.80, neighbors: ['MR', 'BM'] },
};

interface AgentState {
    id: string;
    currentNodeId: NodeId;
    targetNodeId: NodeId;
    progress: number; // 0.0 to 1.0
    speed: number;    // Progress increment per frame
    x: number; // Percentage 0.0 - 1.0
    y: number; // Percentage 0.0 - 1.0
    facing: 'left' | 'right';
}

// --- Building Labels (Stranger Things Lore) ---
interface BuildingLabel {
    id: string;
    label: string;
    x: number; // Percentage
    y: number; // Percentage
    rotation?: number;
}

const BUILDINGS: BuildingLabel[] = [
    { id: 'hospital', label: 'Hawkins Memorial Hospital', x: 0.10, y: 0.70 },
    { id: 'library', label: 'Hawkins Public Library', x: 0.45, y: 0.40 },
    { id: 'school', label: 'Hawkins Middle School', x: 0.10, y: 0.15 },
    { id: 'arcade', label: 'The Palace Arcade', x: 0.90, y: 0.70 },
    { id: 'police', label: 'Police Station', x: 0.60, y: 0.82 },
    { id: 'store', label: "Melvald's General Store", x: 0.40, y: 0.15 },
    { id: 'pizza', label: 'Surfer Boy Pizza', x: 0.35, y: 0.82 },
    { id: 'house_mike', label: "Wheeler's House", x: 0.85, y: 0.45 },
];

const Hawkins = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isUpsideDown, setIsUpsideDown] = useState(false);

    // Initial Agents - Start exactly at nodes
    const [mike, setMike] = useState<AgentState>({
        id: 'mike',
        currentNodeId: 'ML',
        targetNodeId: 'C',
        progress: 0,
        speed: 0.0015,
        x: NETWORK['ML'].x,
        y: NETWORK['ML'].y,
        facing: 'right'
    });

    const [eleven, setEleven] = useState<AgentState>({
        id: 'eleven',
        currentNodeId: 'TR',
        targetNodeId: 'TM',
        progress: 0,
        speed: 0.0015,
        x: NETWORK['TR'].x,
        y: NETWORK['TR'].y,
        facing: 'left'
    });

    const [demogorgon, setDemogorgon] = useState<AgentState>({
        id: 'demogorgon',
        currentNodeId: 'C',
        targetNodeId: 'BM',
        progress: 0,
        speed: 0.002,
        x: NETWORK['C'].x,
        y: NETWORK['C'].y,
        facing: 'right'
    });

    useEffect(() => {
        let animationFrameId: number;

        const updateAgent = (agent: AgentState): AgentState => {
            let { currentNodeId, targetNodeId, progress, speed, facing } = agent;

            // 1. Move progress
            progress += speed;

            // 2. Check arrival
            if (progress >= 1.0) {
                currentNodeId = targetNodeId;
                progress = 0;

                // Pick new random neighbor
                const current = NETWORK[currentNodeId];
                const neighbors = current.neighbors;
                const nextId = neighbors[Math.floor(Math.random() * neighbors.length)];
                targetNodeId = nextId;
            }

            // 3. Interpolate Percentage Position
            const startNode = NETWORK[currentNodeId];
            const endNode = NETWORK[targetNodeId];

            const pctX = startNode.x + (endNode.x - startNode.x) * progress;
            const pctY = startNode.y + (endNode.y - startNode.y) * progress;

            // 4. Update Facing
            const dpX = endNode.x - startNode.x;
            if (dpX > 0) facing = 'right';
            if (dpX < 0) facing = 'left';

            return { ...agent, currentNodeId, targetNodeId, progress, x: pctX, y: pctY, facing };
        };

        const animate = () => {
            setMike(prev => updateAgent(prev));
            setEleven(prev => updateAgent(prev));
            setDemogorgon(prev => updateAgent(prev));

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // Helper to calculate walking bounce (sine wave)
    const getBounce = (progress: number) => {
        // 8 steps per path segment
        return Math.abs(Math.sin(progress * Math.PI * 8)) * 4;
    };

    // --- Loading State ---
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
                <img
                    src="/img/hawkins-load.png"
                    alt="Loading..."
                    className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-1000"
                />
                <div className="z-10 flex flex-col items-center gap-4">
                    <div className="text-red-600 font-bold text-2xl tracking-[0.2em] font-serif animate-pulse drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] text-center"
                        style={{ fontFamily: "'ITC Benguiat', serif" }}>
                        STRANGER<br />THINGS
                    </div>
                    <div className="text-white/80 font-mono text-xs tracking-widest animate-pulse">
                        LOADING...
                    </div>
                </div>
                {/* Retro Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%]" />
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative overflow-hidden bg-[#1a1a1a]"
            style={{ imageRendering: 'pixelated' }}
        >
            {/* Background Map */}
            <div
                className="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out"
                style={{
                    backgroundImage: `url(/img/${isUpsideDown ? 'hawkins-upside-down.png' : 'hawkins-map.png'})`,
                    backgroundSize: '100% 100%', // FORCE STRETCH TO FIT
                    backgroundPosition: 'center',
                    opacity: 0.9,
                    filter: isUpsideDown ? 'contrast(1.2) brightness(0.8)' : 'none'
                }}
            />

            {/* Upside Down Particles/Spores */}
            {isUpsideDown && (
                <div className="absolute inset-0 pointer-events-none z-20 animate-pulse bg-cover opacity-30 mix-blend-overlay"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />
            )}

            {/* Building Labels (Yellow Box Style) */}
            {BUILDINGS.map(b => (
                <div
                    key={b.id}
                    className="absolute text-[10px] font-medium text-black bg-[#FFD700] px-1.5 py-0.5 rounded-sm border border-black/20 shadow-sm pointer-events-none z-10 whitespace-nowrap opacity-90"
                    style={{
                        left: `${b.x * 100}%`,
                        top: `${b.y * 100}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {b.label}
                </div>
            ))}

            {/* Mike */}
            <img
                src="/img/mike.png"
                alt="Mike"
                className="absolute w-16 h-16 object-contain transition-all duration-100 ease-linear"
                style={{
                    left: `${mike.x * 100}%`,
                    top: `${mike.y * 100}%`,
                    // Center anchor (-50%, -50%), Flip X based on facing, Bounce translation Y
                    transform: `translate(-50%, -50%) scaleX(${mike.facing === 'right' ? 1 : -1}) translateY(-${getBounce(mike.progress)}px)`,
                    filter: isUpsideDown
                        ? 'drop-shadow(0 4px 4px rgba(255,0,0,0.5)) sepia(0.5)'
                        : 'drop-shadow(0 4px 4px rgba(0,0,0,0.5))',
                    zIndex: 20
                }}
            />

            {/* Eleven */}
            <img
                src="/img/eleven.png"
                alt="Eleven"
                className="absolute w-16 h-16 object-contain transition-all duration-100 ease-linear"
                style={{
                    left: `${eleven.x * 100}%`,
                    top: `${eleven.y * 100}%`,
                    transform: `translate(-50%, -50%) scaleX(${eleven.facing === 'right' ? 1 : -1}) translateY(-${getBounce(eleven.progress)}px)`,
                    filter: isUpsideDown
                        ? 'drop-shadow(0 4px 4px rgba(255,0,0,0.5)) sepia(0.5)'
                        : 'drop-shadow(0 4px 4px rgba(236, 72, 153, 0.3))',
                    zIndex: 20
                }}
            />

            {/* Demogorgon (Only in Upside Down) */}
            {isUpsideDown && (
                <img
                    src="/img/demogorgan.png"
                    alt="Demogorgon"
                    className="absolute w-20 h-20 object-contain transition-all duration-100 ease-linear"
                    style={{
                        left: `${demogorgon.x * 100}%`,
                        top: `${demogorgon.y * 100}%`,
                        transform: `translate(-50%, -50%) scaleX(${demogorgon.facing === 'right' ? 1 : -1}) translateY(-${getBounce(demogorgon.progress)}px)`,
                        filter: 'drop-shadow(0 0 15px rgba(255,0,0,0.6))',
                        zIndex: 25
                    }}
                />
            )}

            {/* Retro Overlay */}
            <div className={`absolute inset-0 pointer-events-none z-30 bg-[length:100%_2px,3px_100%] ${isUpsideDown ? 'bg-[linear-gradient(rgba(50,0,0,0.2)_50%,rgba(0,0,0,0.4)_50%)]' : 'bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)]'}`} />

            {/* Toggle Button */}
            <button
                onClick={() => setIsUpsideDown(!isUpsideDown)}
                className={`absolute top-4 right-4 z-50 px-3 py-1.5 rounded border text-xs font-bold font-mono transition-all duration-500
                    ${isUpsideDown
                        ? 'bg-red-900/80 border-red-500 text-red-200 hover:bg-red-800 shadow-[0_0_15px_rgba(255,0,0,0.5)]'
                        : 'bg-blue-900/80 border-blue-500 text-blue-200 hover:bg-blue-800 shadow-[0_0_15px_rgba(0,0,255,0.3)]'
                    }`}
            >
                {isUpsideDown ? '🌌 NORMAL WORLD' : '🙃 UPSIDE DOWN'}
            </button>

            <div className="absolute bottom-4 right-4 text-white/40 text-[10px] font-mono z-40 bg-black/50 px-2 rounded">
                HAWKINS_NAV_SYSTEM_V4 :: {isUpsideDown ? 'DIMENSION_ERROR' : 'ROAD_NETWORK_ACTIVE'}
            </div>
        </div>
    );
};

export default Hawkins;
