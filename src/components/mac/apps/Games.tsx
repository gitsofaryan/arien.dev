import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Games = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const winner = calculateWinner(board);
    const status = winner
        ? `Winner: ${winner}`
        : board.every(Boolean)
            ? "Draw!"
            : `Next player: ${xIsNext ? 'X' : 'O'}`;

    const handleClick = (i: number) => {
        if (winner || board[i]) return;
        const newBoard = [...board];
        newBoard[i] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 bg-[#1e1e1e] text-white selection:bg-purple-500/30">
            <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-purple-500/20 shadow-lg shadow-purple-900/20">
                    <span className="text-3xl">🎮</span>
                </div>
                <h2 className="text-3xl font-bold mb-1 tracking-tight text-white">Tic-Tac-Toe</h2>
                <p className="text-white/40 text-xs uppercase tracking-widest font-medium">Classic Game</p>
            </div>

            <div className="mb-8 flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/5 backdrop-blur-sm">
                <span className={`w-2 h-2 rounded-full ${winner ? 'bg-green-500 animate-pulse' : 'bg-purple-500'}`}></span>
                <span className="text-sm font-medium tracking-wide text-white/80">{status}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8 p-3 bg-black/20 rounded-2xl border border-white/5 shadow-xl">
                {board.map((square, i) => (
                    <button
                        key={i}
                        className={`
                            w-20 h-20 rounded-xl text-4xl font-bold flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95
                            ${square ? 'bg-white/10 shadow-lg border border-white/10' : 'bg-white/5 border border-transparent hover:bg-white/10'}
                            ${square === 'X' ? 'text-purple-400 drop-shadow-[0_2px_4px_rgba(192,132,252,0.3)]' : 'text-pink-400 drop-shadow-[0_2px_4px_rgba(244,114,182,0.3)]'}
                        `}
                        onClick={() => handleClick(i)}
                    >
                        {square}
                    </button>
                ))}
            </div>

            <Button
                onClick={resetGame}
                variant="outline"
                className="w-full max-w-[200px] h-12 gap-2 bg-white text-black border-0 hover:bg-gray-200 hover:scale-105 transition-all rounded-xl font-bold shadow-lg shadow-white/10"
            >
                <RefreshCw size={18} />
                New Game
            </Button>
        </div>
    );
};

function calculateWinner(squares: any[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Games;
