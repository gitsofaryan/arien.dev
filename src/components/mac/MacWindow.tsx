import React, { useRef } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';

interface MacWindowProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    defaultPosition?: { x: number; y: number };
    defaultSize?: { width: number | string; height: number | string };
    icon?: React.ReactNode;
    zIndex?: number;
    onClick?: () => void;
}

const MacWindow: React.FC<MacWindowProps> = ({ title, isOpen, onClose, children, defaultPosition = { x: 50, y: 50 }, defaultSize = { width: 600, height: 400 }, icon, zIndex = 50, onClick }) => {
    const nodeRef = useRef(null);

    if (!isOpen) return null;

    return (
        <Draggable
            handle=".window-handle"
            defaultPosition={defaultPosition}
            nodeRef={nodeRef}
        >
            <div
                ref={nodeRef}
                style={{ position: 'absolute', zIndex }}
                className="pointer-events-auto shadow-2xl rounded-lg overflow-hidden border border-vscode-border/50"
                onClick={onClick}
            >
                <Resizable
                    defaultSize={defaultSize}
                    minWidth={300}
                    minHeight={200}
                    className="flex flex-col bg-vscode-sidebar/90 backdrop-blur-2xl"
                >
                    {/* Title Bar */}
                    <div
                        className="window-handle h-10 bg-vscode-bg/40 border-b border-vscode-border/30 flex items-center px-4 justify-between cursor-move select-none shrink-0"
                    >
                        <div className="flex gap-2 group">
                            <button
                                onClick={(e) => { e.stopPropagation(); onClose(); }}
                                className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 flex items-center justify-center transition-colors shadow-inner"
                            >
                                <X size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
                            </button>
                            <button className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 flex items-center justify-center transition-colors shadow-inner">
                                <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
                            </button>
                            <button className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 flex items-center justify-center transition-colors shadow-inner">
                                <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/60" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-vscode-text/90 shadow-sm">
                            {icon}
                            <span>{title}</span>
                        </div>
                        <div className="w-12"></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-auto p-4 bg-transparent text-vscode-text cursor-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {children}

                        {/* Custom scrollbar hiding style injection for webkit */}
                        <style>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                    </div>
                </Resizable>
            </div>
        </Draggable>
    );
};

export default MacWindow;
