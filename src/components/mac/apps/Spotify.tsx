import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Search, Clock, Calendar, MoreHorizontal, Pause, Heart, ArrowDownCircle, Volume2, Loader2, Music4 } from 'lucide-react';

// The User's specific playlist (Static Data with Local Files)
// Filenames must match exactly in public/music/
const PLAYLIST = [
    { title: "Never Ending Story", artist: "Limahl", album: "Don't Suppose", added: "3 days ago", duration: "3:32", file: "never_ending_story.mp3" },
    { title: "Every Breath You Take", artist: "The Police", album: "Synchronicity", added: "4 days ago", duration: "4:13", file: "every_breath_you_take.mp3" },
    { title: "Running Up That Hill", artist: "Kate Bush", album: "Hounds of Love", added: "1 week ago", duration: "4:58", file: "running_up_that_hill.mp3" },
    { title: "Day One", artist: "Hans Zimmer", album: "Interstellar", added: "1 week ago", duration: "3:19", file: "day_one.mp3" },
    { title: "Time", artist: "Hans Zimmer", album: "Inception", added: "1 week ago", duration: "4:35", file: "time.mp3" },
    { title: "Cornfield Chase", artist: "Hans Zimmer", album: "Interstellar", added: "1 week ago", duration: "2:06", file: "cornfield_chase.mp3" },
    { title: "Nightcall", artist: "Kavinsky", album: "OutRun", added: "2 weeks ago", duration: "4:18", file: "nightcall.mp3" },
    { title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", added: "2 weeks ago", duration: "4:03", file: "midnight_city.mp3" },
    { title: "Resonance", artist: "Home", album: "Odyssey", added: "3 weeks ago", duration: "3:32", file: "resonance.mp3" },
    { title: "After Dark", artist: "Mr. Kitty", album: "Time", added: "1 month ago", duration: "4:17", file: "after_dark.mp3" }
];

const Spotify = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [search, setSearch] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Audio ref
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const handlePlay = async (index: number) => {
        const track = PLAYLIST[index];

        // Toggle if same track
        if (currentTrackIndex === index && audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().catch(console.error);
                setIsPlaying(true);
            }
            return;
        }

        // Stop previous
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }

        setCurrentTrackIndex(index);
        setIsPlaying(true); // Optimistic UI
        setError(null);

        // Play local file
        const audioPath = `/music/${track.file}`;
        audioRef.current = new Audio(audioPath);
        audioRef.current.volume = 0.5;

        try {
            await audioRef.current.play();
            setIsPlaying(true);
            audioRef.current.onended = () => setIsPlaying(false);
            audioRef.current.onerror = () => {
                console.error(`Error loading file: ${audioPath}`);
                setError(`File not found: /public${audioPath}`);
                setIsPlaying(false);
            };
        } catch (err) {
            console.error("Playback error:", err);
            setIsPlaying(false);
        }
    };

    const filteredTracks = PLAYLIST.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.artist.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-[#121212] text-white font-sans selection:bg-[#1ed760] selection:text-black relative">
            {/* Header / Top Bar */}
            <div className="h-16 flex items-center justify-between px-6 bg-[#000000]/40 shrink-0 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-4 text-white/70">
                    <button className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:text-white transition-colors">
                        <RotateCcw size={16} />
                    </button>
                    {error && (
                        <div className="text-red-400 text-xs flex items-center gap-2 bg-red-900/20 px-3 py-1 rounded-full animate-pulse">
                            <span>⚠️ {error}</span>
                        </div>
                    )}
                </div>

                {/* Search */}
                <div className="relative group w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search songs..."
                        className="w-full bg-[#2A2A2A] rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all hover:bg-[#3A3A3A]"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="w-8 rounded-full bg-orange-500 h-8 flex items-center justify-center text-xs font-bold text-black">A</div>
            </div>

            {/* Playlist Content */}
            <div className="flex-1 overflow-auto">
                {/* Playlist Header Info */}
                <div className="px-8 pt-4 pb-6 flex items-end gap-6 bg-gradient-to-b from-indigo-900/80 to-[#121212]">
                    <div className="w-52 h-52 shadow-2xl shadow-black/50 flex flex-col relative items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-800 text-white shrink-0 group">
                        <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-500">🌌</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="uppercase text-xs font-bold tracking-wider">Playlist</span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4 shadow-lg">Cinematic Vibes</h1>
                        <div className="flex items-center gap-2 text-sm text-white/70 font-medium">
                            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-black font-bold">A</div>
                            <span className="text-white hover:underline cursor-pointer">Arien</span>
                            <span>•</span>
                            <span>{PLAYLIST.length} songs, 1 hr 15 min</span>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="px-8 py-6 relative z-10 flex items-center gap-8">
                    <button
                        className="w-14 h-14 rounded-full bg-[#1ed760] text-black flex items-center justify-center hover:scale-105 hover:bg-[#1fdf64] transition-all shadow-lg shadow-black/40"
                        onClick={() => currentTrackIndex !== null ? handlePlay(currentTrackIndex) : handlePlay(0)}
                    >
                        {isPlaying ? (
                            <Pause size={28} fill="currentColor" />
                        ) : (
                            <Play size={28} fill="currentColor" className="ml-1" />
                        )}
                    </button>
                    <div className="flex gap-6 text-white/50">
                        <Heart size={32} className="hover:text-white transition-colors cursor-pointer" />
                        <ArrowDownCircle size={32} className="hover:text-white transition-colors cursor-pointer" />
                        <MoreHorizontal size={32} className="hover:text-white transition-colors cursor-pointer" />
                    </div>
                </div>

                {/* Table Header */}
                <div className="px-8 sticky top-0 bg-[#121212] z-10 border-b border-white/10 text-white/50 text-xs uppercase font-medium tracking-wider h-10 flex items-center">
                    <div className="w-10 text-center">#</div>
                    <div className="flex-1 px-4">Title</div>
                    <div className="w-1/3 px-4 hidden md:block">Album</div>
                    <div className="w-32 px-4 hidden lg:block">Date Added</div>
                    <div className="w-16 text-center"><Clock size={16} /></div>
                </div>

                {/* Tracks List */}
                <div className="px-4 pb-8 mt-2">
                    {filteredTracks.map((track, i) => {
                        const isCurrent = currentTrackIndex === i;
                        return (
                            <div
                                key={i}
                                onDoubleClick={() => handlePlay(i)}
                                className={`group h-14 flex items-center rounded-md hover:bg-white/10 transition-colors cursor-default text-sm text-white/90 ${isCurrent ? 'bg-white/10 text-[#1ed760]' : ''}`}
                            >
                                <div className="w-10 text-center text-white/60 group-hover:hidden font-mono flex items-center justify-center">
                                    {isCurrent && isPlaying ? <Volume2 size={16} className="text-[#1ed760] animate-pulse" /> :
                                        i + 1}
                                </div>
                                <div className="w-10 text-center hidden group-hover:flex items-center justify-center text-white">
                                    {isCurrent && isPlaying ? (
                                        <Pause size={14} fill="currentColor" onClick={() => handlePlay(i)} className="cursor-pointer" />
                                    ) : (
                                        <Play size={14} fill="currentColor" onClick={() => handlePlay(i)} className="cursor-pointer hover:scale-110" />
                                    )}
                                </div>

                                <div className="flex-1 px-4 flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 bg-[#282828] rounded flex items-center justify-center text-white/20 shrink-0">
                                        <Music4 size={18} />
                                    </div>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className={`font-medium truncate ${isCurrent ? 'text-[#1ed760]' : 'text-white'}`}>{track.title}</span>
                                        <span className="text-white/60 text-xs truncate group-hover:text-white hover:underline cursor-pointer transition-colors max-w-fit">{track.artist}</span>
                                    </div>
                                </div>

                                <div className="w-1/3 px-4 hidden md:flex text-white/60 text-xs hover:text-white hover:underline cursor-pointer truncate">
                                    {track.album}
                                </div>

                                <div className="w-32 px-4 hidden lg:block text-white/60 text-xs">
                                    {track.added}
                                </div>

                                <div className="w-16 text-center text-white/60 text-xs font-mono">
                                    {track.duration}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Spotify;
