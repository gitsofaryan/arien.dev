import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Trophy, Clock, Zap } from 'lucide-react';

const SAMPLE_TEXTS = [
    "The quick brown fox jumps over the lazy dog.",
    "Technology is best when it brings people together.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "Be the change that you wish to see in the world.",
    "In the middle of difficulty lies opportunity.",
    "Life is what happens when you're busy making other plans.",
    "The way to get started is to quit talking and begin doing.",
    "Your time is limited, so don't waste it living someone else's life.",
    "Innovation distinguishes between a leader and a follower.",
    "The only way to do great work is to love what you do.",
    "Stay hungry, stay foolish.",
    "Simplicity is the ultimate sophistication.",
    "Code is like humor. When you have to explain it, it’s bad.",
    "First, solve the problem. Then, write the code.",
    "Experience is the name everyone gives to their mistakes.",
    "Java is to JavaScript what car is to Carpet.",
    "Knowledge is power.",
    "Creativity is intelligence having fun.",
    "Whatever you are, be a good one."
];

const SpeedMaster = () => {
    const [text, setText] = useState("");
    const [input, setInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [timeLeft, setTimeLeft] = useState(30);
    const [status, setStatus] = useState<'idle' | 'running' | 'finished'>('idle');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        resetGame();
    }, []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (status === 'running' && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        finishGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status, timeLeft]);

    useEffect(() => {
        if (status === 'running') {
            const timeElapsed = (30 - timeLeft) / 60; // in minutes
            if (timeElapsed > 0) {
                const wordsTyped = input.length / 5;
                setWpm(Math.round(wordsTyped / timeElapsed));
            }
        }
    }, [input, timeLeft, status]);

    const resetGame = () => {
        const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
        setText(randomText);
        setInput("");
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setTimeLeft(30);
        setStatus('idle');
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const finishGame = (finalInput: string = input) => {
        setStatus('finished');
        calculateFinalStats(finalInput);
    };

    const calculateFinalStats = (finalInput: string = input) => {
        if (!startTime) return;

        // Calculate exact time taken in minutes
        const endTime = Date.now();
        const timeTakenMs = endTime - startTime;
        const timeTakenMin = timeTakenMs / 1000 / 60;

        // Standard WPM: (all characters / 5) / time in minutes
        const wordsTyped = finalInput.length / 5;
        const grossWpm = timeTakenMin > 0 ? Math.round(wordsTyped / timeTakenMin) : 0;

        setWpm(grossWpm);
        // Ensure accuracy is up to date one last time
        let correctChars = 0;
        for (let i = 0; i < finalInput.length; i++) {
            if (finalInput[i] === text[i]) correctChars++;
        }
        setAccuracy(Math.round((correctChars / finalInput.length) * 100) || 100);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (status === 'finished') return;

        const val = e.target.value;
        if (status === 'idle') {
            setStatus('running');
            setStartTime(Date.now());
        }

        setInput(val);

        // Accuracy Calculation
        let correctChars = 0;
        for (let i = 0; i < val.length; i++) {
            if (val[i] === text[i]) correctChars++;
        }
        setAccuracy(Math.round((correctChars / val.length) * 100) || 100);

        // Check for completion
        if (val === text) {
            finishGame(val);
        }
    };

    const renderText = () => {
        return text.split('').map((char, index) => {
            let color = "text-white/50";
            if (index < input.length) {
                color = input[index] === char ? "text-green-400" : "text-red-400";
            }
            return (
                <span key={index} className={`${color} transition-colors duration-100`}>
                    {char}
                </span>
            );
        });
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] text-white p-6 font-mono relative overflow-hidden">
            {/* Header / Stats */}
            <div className="flex justify-between items-center mb-8 shrink-0">
                <div className="flex gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-white/40 uppercase tracking-widest">WPM</span>
                        <span className="text-2xl font-bold text-yellow-400 font-pixel">{wpm}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-white/40 uppercase tracking-widest">ACC</span>
                        <span className="text-2xl font-bold text-blue-400 font-pixel">{accuracy}%</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-white/40 uppercase tracking-widest">Time</span>
                    <span className={`text-2xl font-bold font-pixel ${timeLeft < 10 ? 'text-red-500' : 'text-white'}`}>
                        {timeLeft}s
                    </span>
                </div>
            </div>

            {/* Display Text */}
            <div
                className="relative bg-white/5 p-6 rounded-lg text-lg leading-relaxed tracking-wide min-h-[120px] mb-6 border border-white/10 shadow-inner flex items-center shadow-black/50"
                onClick={() => inputRef.current?.focus()}
            >
                <div>{renderText()}</div>
                {status === 'finished' && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg animate-fade-in z-20">
                        <Trophy size={48} className="text-yellow-400 mb-2 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                        <h2 className="text-2xl font-bold text-white mb-1">Result</h2>
                        <div className="flex gap-6 mb-4">
                            <div className="text-center">
                                <div className="text-3xl font-pixel text-yellow-400">{wpm}</div>
                                <div className="text-[10px] text-white/50 uppercase">WPM</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-pixel text-blue-400">{accuracy}%</div>
                                <div className="text-[10px] text-white/50 uppercase">Accuracy</div>
                            </div>
                        </div>
                        <button
                            onClick={resetGame}
                            className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded hover:scale-105 transition-transform"
                        >
                            <RefreshCw size={16} /> Play Again
                        </button>
                    </div>
                )}
            </div>

            {/* Hidden Input */}
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInput}
                className="absolute opacity-0 top-0 left-0 w-full h-full cursor-default z-10"
                autoFocus
                onBlur={() => status === 'running' && inputRef.current?.focus()}
            />

            <div className="text-center text-xs text-white/30 mt-auto">
                {status === 'idle' ? 'Start typing to begin...' : 'Focus is locked while typing'}
            </div>
        </div>
    );
};

export default SpeedMaster;
