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
        <div className="flex flex-col items-center justify-center h-full p-4">
            <h2 className="text-2xl font-bold mb-4 font-mono text-purple-400">Tic-Tac-Toe</h2>

            <div className="mb-4 text-lg font-bold text-vscode-text">{status}</div>

            <div className="grid grid-cols-3 gap-2 mb-6">
                {board.map((square, i) => (
                    <button
                        key={i}
                        className={`
                            w-20 h-20 rounded-lg text-4xl font-bold flex items-center justify-center transition-all duration-200
                            ${square ? 'bg-vscode-highlight shadow-inner' : 'bg-vscode-sidebar border-2 border-vscode-border hover:bg-vscode-highlight/50'}
                            ${square === 'X' ? 'text-blue-400' : 'text-rose-400'}
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
                className="gap-2 border-vscode-border hover:bg-vscode-highlight"
            >
                <RefreshCw size={16} />
                Restart Game
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
