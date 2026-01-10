import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Search, MoreHorizontal, Pause, Heart, ArrowDownCircle, Volume2, Music4 } from 'lucide-react';

// The User's specific playlist (Static Data with Local Files)
const STATIC_PLAYLIST = [
    { title: "Running Up That Hill", artist: "Kate Bush", album: "Hounds of Love", added: "1 week ago", duration: "4:58", file: "Running up that hill.m4a" },
    { title: "Every Breath You Take", artist: "The Police", album: "Synchronicity", added: "4 days ago", duration: "4:13", file: "Every Breath You Take Video.m4a" },
    { title: "Cornfield Chase", artist: "Hans Zimmer", album: "Interstellar", added: "1 week ago", duration: "2:06", file: "Cornfield Chase.m4a" },
    { title: "Love Me Not", artist: "Unknown", album: "Unknown", added: "Just now", duration: "3:00", file: "Love Me Not.m4a" }
];

type Track = (typeof STATIC_PLAYLIST)[number] & {
    status: 'loading' | 'ready' | 'error';
    blobUrl?: string;
};

const Spotify = () => {
    const [tracks, setTracks] = useState<Track[]>(STATIC_PLAYLIST.map(t => ({ ...t, status: 'loading' })));
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const [search, setSearch] = useState("");

    // Use standard HTMLAudioElement ref
    const audioRef = useRef<HTMLAudioElement>(null);

    // Initial Load: Check/Preload files asynchronously
    useEffect(() => {
        const loadTracks = async () => {
            const updates = await Promise.all(STATIC_PLAYLIST.map(async (t) => {
                try {
                    const response = await fetch(`/music/${t.file}`);
                    if (!response.ok) throw new Error("Failed to load");
                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    return { status: 'ready' as const, blobUrl };
                } catch (e) {
                    console.error(`Failed to load ${t.file}`, e);
                    return { status: 'error' as const };
                }
            }));

            setTracks(prev => prev.map((t, i) => ({
                ...t,
                ...updates[i]
            })));
        };

        loadTracks();

        return () => {
            tracks.forEach(t => t.blobUrl && URL.revokeObjectURL(t.blobUrl));
        };
    }, []);

    // Effect for play/pause toggle when isPlaying changes
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.play().catch(err => {
                console.error("Playback failed:", err);
                setIsPlaying(false);
            });
        } else {
            audio.pause();
        }
    }, [isPlaying, currentTrackIndex]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            if (isPlaying) {
                audioRef.current.play().catch(console.error);
            }
        }
    };

    const handleEnded = () => {
        handleNext();
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const handlePlay = (index: number) => {
        const track = tracks[index];
        if (track.status === 'error') {
            alert("File missing");
            return;
        }
        if (track.status === 'loading') return;

        if (currentTrackIndex === index) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentTrackIndex(index);
            setIsPlaying(true);
        }
    };

    const handleNext = () => {
        let nextIndex = (currentTrackIndex ?? -1) + 1;
        while (nextIndex < tracks.length && tracks[nextIndex].status !== 'ready') {
            nextIndex++;
        }
        if (nextIndex < tracks.length) {
            setCurrentTrackIndex(nextIndex);
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
            setCurrentTrackIndex(null);
        }
    };

    const handlePrev = () => {
        let prevIndex = (currentTrackIndex ?? 0) - 1;
        while (prevIndex >= 0 && tracks[prevIndex].status !== 'ready') {
            prevIndex--;
        }
        if (prevIndex >= 0) {
            setCurrentTrackIndex(prevIndex);
            setIsPlaying(true);
        } else {
            setCurrentTrackIndex(0);
            setIsPlaying(true);
        }
    };

    // Format time helper
    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const filteredTracks = tracks.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.artist.toLowerCase().includes(search.toLowerCase())
    );

    const currentTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null;

    return (
        <div className="flex flex-col h-full bg-[#121212] text-white font-sans selection:bg-[#1ed760] selection:text-black relative">

            {/* Native Audio Element */}
            <audio
                ref={audioRef}
                src={currentTrack?.blobUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
            />

            {/* Header / Top Bar */}
            <div className="h-16 flex items-center justify-between px-6 bg-[#000000]/40 shrink-0 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-4 text-white/70">
                    <button className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:text-white transition-colors">
                        <RotateCcw size={16} />
                    </button>
                    {/* Status Summary */}
                    <div className="text-xs font-mono text-white/40 flex gap-2">
                        <span className="text-green-400">{tracks.filter(t => t.status === 'ready').length} Ready</span>
                        <span className="text-red-400">{tracks.filter(t => t.status === 'error').length} Missing</span>
                    </div>
                </div>

                {/* Search */}
                <div className="relative group w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all hover:bg-[#3A3A3A]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Playlist Content */}
            <div className="flex-1 overflow-auto pb-48 scrollbar-hide">
                {/* Playlist Header Info */}
                <div className="px-6 pt-8 pb-6 flex flex-col items-center gap-4 bg-gradient-to-b from-indigo-900/80 to-[#121212] text-center">
                    <div className="w-48 h-48 shadow-2xl shadow-black/50 flex flex-col relative items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-800 text-white shrink-0 group rounded-md">
                        <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-500">🌌</div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <h1 className="text-3xl font-bold tracking-tight text-white shadow-lg">My Fav Songs</h1>
                        <p className="text-white/60 text-xs font-medium">Unknown Playlist • {tracks.length} songs</p>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="px-4 py-2 relative z-10 flex items-center justify-between">
                    <div className="flex gap-4">
                        <Heart size={24} className="text-white/50 hover:text-white transition-colors cursor-pointer" />
                        <ArrowDownCircle size={24} className="text-white/50 hover:text-white transition-colors cursor-pointer" />
                        <MoreHorizontal size={24} className="text-white/50 hover:text-white transition-colors cursor-pointer" />
                    </div>
                    <button
                        className="w-12 h-12 rounded-full bg-[#1ed760] text-black flex items-center justify-center hover:scale-105 hover:bg-[#1fdf64] transition-all shadow-lg shadow-black/40"
                        onClick={() => {
                            const firstReady = tracks.findIndex(t => t.status === 'ready');
                            if (firstReady !== -1) handlePlay(firstReady);
                        }}
                    >
                        {isPlaying ? (
                            <Pause size={24} fill="currentColor" />
                        ) : (
                            <Play size={24} fill="currentColor" className="ml-1" />
                        )}
                    </button>
                </div>

                {/* Tracks List */}
                <div className="px-2 pb-4 mt-2">
                    {filteredTracks.map((track, i) => {
                        const isCurrent = currentTrackIndex === i;
                        return (
                            <div
                                key={i}
                                onClick={() => handlePlay(i)}
                                className={`group h-14 flex items-center p-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer ${isCurrent ? 'bg-white/10' : ''}`}
                            >
                                <div className="flex-1 flex flex-col overflow-hidden mr-3">
                                    <span className={`font-medium truncate text-sm ${isCurrent ? 'text-[#1ed760]' : track.status === 'error' ? 'text-white/30 line-through' : 'text-white'}`}>
                                        {track.title}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {track.status === 'error' && <span className="text-[10px] text-red-500 bg-red-500/10 px-1 rounded">MISSING</span>}
                                        {track.status === 'loading' && <span className="text-[10px] text-yellow-500 bg-yellow-500/10 px-1 rounded">LOADING</span>}
                                        <span className="text-white/60 text-xs truncate">{track.artist}</span>
                                    </div>
                                </div>

                                <div className="text-white/60 text-xs font-mono">
                                    {track.duration.split(':')[0]}:{track.duration.split(':')[1]}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Persistent Player Bar - Custom Native Implementation */}
            <div className="absolute bottom-0 left-0 right-0 h-auto min-h-[5rem] bg-[#181818] border-t border-[#282828] px-4 py-2 flex flex-col justify-center gap-2 z-30 shrink-0">
                {/* Top Row: Track Output */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 overflow-hidden flex-1">
                        {currentTrack ? (
                            <>
                                <div className="w-10 h-10 bg-[#282828] rounded flex items-center justify-center text-white/20 shrink-0">
                                    <Music4 size={18} />
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-medium text-white truncate">{currentTrack.title}</span>
                                    <span className="text-xs text-white/60 truncate">{currentTrack.artist}</span>
                                </div>
                            </>
                        ) : (
                            <span className="text-xs text-white/40">Select a song</span>
                        )}
                    </div>
                    <Heart size={20} className={`${currentTrack ? 'text-green-500' : 'text-white/20'} ml-2`} />
                </div>

                {/* Progress Bar */}
                <div className="w-full flex items-center gap-2 text-[10px] text-white/50 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={handleSeek}
                        className="flex-1 h-1 bg-[#4d4d4d] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                    />
                    <span>{formatTime(duration)}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 pb-1">
                    <Play
                        size={20}
                        className="text-white/70 hover:text-white cursor-pointer rotate-180"
                        onClick={handlePrev}
                    />
                    <button
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                        onClick={() => currentTrackIndex !== null && handlePlay(currentTrackIndex)}
                        disabled={currentTrackIndex === null}
                    >
                        {isPlaying ? (
                            <Pause size={20} fill="currentColor" />
                        ) : (
                            <Play size={20} fill="currentColor" className="ml-0.5" />
                        )}
                    </button>
                    <Play
                        size={20}
                        className="text-white/70 hover:text-white cursor-pointer"
                        onClick={handleNext}
                    />
                </div>
            </div>
        </div>
    );
};

export default Spotify;
