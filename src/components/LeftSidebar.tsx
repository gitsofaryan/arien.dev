import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Github, Linkedin, FileDown } from 'lucide-react';
import { resumeData } from "@/data/resumeData";

const LeftSidebar = () => {
    return (
        <aside className="w-full md:w-[320px] bg-[#181818] border-r border-[#1f1f1f] flex flex-col h-full overflow-y-auto font-mono">
            <div className="p-6 flex flex-col gap-6">
                {/* Profile Header */}
                <div className="flex flex-col gap-4">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-vscode-border">
                        <img
                            src="https://github.com/gitsofaryan.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">{resumeData.personalInfo.name}</h2>
                        <p className="text-vscode-accent font-mono text-sm">&lt;Fullstack Engineer /&gt;</p>
                    </div>
                </div>

                {/* Bio Snippet */}
                <p className="text-vscode-text text-sm leading-relaxed">
                    I build high-performance systems and decentralized protocols. Transforming complex problems into elegant code.
                </p>

                {/* Contact Info */}
                <div className="flex flex-col gap-3 text-sm text-vscode-text">
                    <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-vscode-accent" />
                        <span>India</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail size={16} className="text-vscode-accent" />
                        <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-white transition-colors truncate">
                            {resumeData.personalInfo.email}
                        </a>
                    </div>
                </div>

                {/* Socials & Actions */}
                <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex gap-2 mb-2">
                        <a href={`https://github.com/${resumeData.personalInfo.github}`} target="_blank" rel="noopener" className="p-2 bg-vscode-sidebar border border-vscode-border rounded hover:border-vscode-accent transition-colors">
                            <Github size={18} />
                        </a>
                        <a href={`https://linkedin.com/in/${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener" className="p-2 bg-vscode-sidebar border border-vscode-border rounded hover:border-vscode-accent transition-colors">
                            <Linkedin size={18} />
                        </a>
                    </div>

                    <a href="/resume.pdf" download="Resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button variant="outline" className="w-full gap-2 border-vscode-accent text-vscode-accent hover:bg-vscode-accent hover:text-white transition-all">
                            <FileDown size={16} />
                            <span>Download CV</span>
                        </Button>
                    </a>

                    <a href={`mailto:${resumeData.personalInfo.email}`} className="w-full">
                        <Button className="w-full gap-2 bg-white text-black hover:bg-gray-200">
                            <Mail size={16} />
                            <span>Work with me</span>
                        </Button>
                    </a>
                </div>
            </div>
        </aside>
    );
};

export default LeftSidebar;
