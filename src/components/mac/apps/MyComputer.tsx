import React from 'react';
import { HardDrive, Folder, FileCode, Cpu, Terminal } from 'lucide-react';

const MyComputer = () => {
    return (
        <div className="grid grid-cols-4 gap-4 p-2">
            <div className="col-span-1 border-r border-vscode-border pr-2 flex flex-col gap-2">
                <div className="flex items-center gap-2 p-2 rounded hover:bg-vscode-highlight cursor-pointer bg-vscode-highlight/50 text-vscode-text">
                    <HardDrive size={16} className="text-blue-400" />
                    <span className="text-sm font-medium">Macintosh HD</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-vscode-highlight cursor-pointer text-vscode-text/70">
                    <Terminal size={16} className="text-orange-400" />
                    <span className="text-sm">Applications</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded hover:bg-vscode-highlight cursor-pointer text-vscode-text/70">
                    <Folder size={16} className="text-yellow-400" />
                    <span className="text-sm">Documents</span>
                </div>
            </div>

            <div className="col-span-3">
                <h3 className="text-xs font-bold text-vscode-text/50 uppercase mb-4">System Information</h3>

                <div className="flex gap-6 mb-8">
                    <div className="w-20 h-20 bg-vscode-highlight rounded-full flex items-center justify-center">
                        <Cpu size={40} className="text-vscode-accent" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">ArienOS v1.0</h2>
                        <p className="text-vscode-text/70">MacBook Pro (14-inch, 2025)</p>
                        <div className="mt-2 space-y-1 text-sm text-vscode-text/60">
                            <p>Chip: Neural Developer Engine</p>
                            <p>Memory: Infinite Learning Capacity</p>
                            <p>Startup Disk: Macintosh HD</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-vscode-highlight/50 transition-colors cursor-pointer group">
                        <FileCode className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-center">React.tsx</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-vscode-highlight/50 transition-colors cursor-pointer group">
                        <FileCode className="w-10 h-10 text-yellow-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-center">Node.js</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-vscode-highlight/50 transition-colors cursor-pointer group">
                        <FileCode className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-center">Go.go</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-vscode-highlight/50 transition-colors cursor-pointer group">
                        <FileCode className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                        <span className="text-xs text-center">Python.py</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyComputer;
