import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

interface MacWindowProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    defaultPosition?: { x: number; y: number };
    icon?: React.ReactNode;
}

const MacWindow: React.FC<MacWindowProps> = ({ title, isOpen, onClose, children, defaultPosition = { x: 50, y: 50 }, icon }) => {
    const [position, setPosition] = useState(defaultPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            // Reset position on close if needed, or keep it. keeping for now.
        }
    }, [isOpen]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (windowRef.current) {
            setIsDragging(true);
            const rect = windowRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPosition({
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y
                });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    if (!isOpen) return null;

    return (
        <div
            ref={windowRef}
            style={{
                left: position.x,
                top: position.y,
                position: 'fixed',
                zIndex: 50
            }}
            className="w-[90vw] md:w-[600px] bg-vscode-sidebar/95 backdrop-blur-md rounded-lg shadow-2xl border border-vscode-border overflow-hidden flex flex-col max-h-[80vh]"
        >
            {/* Title Bar */}
            <div
                className="h-10 bg-vscode-bg/50 border-b border-vscode-border flex items-center px-4 justify-between cursor-move select-none"
                onMouseDown={handleMouseDown}
            >
                <div className="flex gap-2 group">
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(); }}
                        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                    >
                        <X size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
                    </button>
                    <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-colors">
                        <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
                    </button>
                    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors">
                        <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/50" />
                    </button>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-vscode-text opacity-80">
                    {icon}
                    <span>{title}</span>
                </div>
                <div className="w-12"></div> {/* Spacer for balance */}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-4 bg-vscode-bg/80 text-vscode-text">
                {children}
            </div>
        </div>
    );
};

export default MacWindow;
