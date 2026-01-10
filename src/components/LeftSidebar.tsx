import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Github, Linkedin, FileDown, Twitter, Instagram, MessageCircle, Send } from 'lucide-react';
import { resumeData } from "@/data/resumeData";

const LeftSidebar = () => {
    return (
        <aside className="w-full md:w-[320px] bg-vscode-sidebar border-r border-vscode-border flex flex-col h-full overflow-y-auto font-mono transition-colors duration-300">
            <div className="p-6 flex flex-col gap-6">
                {/* Profile Header */}
                <div className="flex flex-col gap-4">
                    <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-vscode-border group">
                        <img
                            src="/img/me.png"
                            alt="Profile"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-vscode-text mb-1">{resumeData.personalInfo.name}</h2>
                        <p className="text-vscode-accent font-mono text-sm">&lt;Fullstack Engineer /&gt;</p>
                    </div>
                </div>

                {/* Bio Snippet */}
                <p className="text-vscode-text/80 text-sm leading-relaxed">
                    I build high-performance systems and decentralized protocols. Transforming complex problems into elegant code.
                </p>

                {/* Contact Info */}
                <div className="flex flex-col gap-3 text-sm text-vscode-text/90">
                    <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-vscode-accent" />
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Jabalpur,+Madhya+Pradesh,+India"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-vscode-accent transition-colors"
                        >
                            Jabalpur, MP, India
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail size={16} className="text-vscode-accent" />
                        <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-vscode-accent transition-colors truncate">
                            {resumeData.personalInfo.email}
                        </a>
                    </div>
                </div>

                {/* Socials & Actions */}
                <div className="flex flex-col gap-3 mt-auto">
                    <div className="flex flex-wrap gap-2 mb-2">
                        <a href={`https://github.com/${resumeData.personalInfo.github}`} target="_blank" rel="noopener" className="p-2 bg-vscode-bg border border-vscode-border rounded hover:border-vscode-accent hover:text-vscode-accent transition-colors text-vscode-text" aria-label="GitHub">
                            <Github size={18} />
                        </a>
                        <a href={`https://linkedin.com/in/${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener" className="p-2 bg-vscode-bg border border-vscode-border rounded hover:border-vscode-accent hover:text-vscode-accent transition-colors text-vscode-text" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                        <a href={`https://twitter.com/${resumeData.personalInfo.twitter}`} target="_blank" rel="noopener" className="p-2 bg-vscode-bg border border-vscode-border rounded hover:border-vscode-accent hover:text-vscode-accent transition-colors text-vscode-text" aria-label="Twitter">
                            <Twitter size={18} />
                        </a>
                        <a href={`https://instagram.com/${resumeData.personalInfo.instagram}`} target="_blank" rel="noopener" className="p-2 bg-vscode-bg border border-vscode-border rounded hover:border-vscode-accent hover:text-vscode-accent transition-colors text-vscode-text" aria-label="Instagram">
                            <Instagram size={18} />
                        </a>
                        {/* Discord */}
                        <div className="group relative p-2 bg-vscode-bg border border-vscode-border rounded hover:border-vscode-accent hover:text-vscode-accent transition-colors text-vscode-text cursor-help" aria-label="Discord">
                            <MessageCircle size={18} />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-black text-white border border-vscode-border rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-50">
                                Discord: {resumeData.personalInfo.discord}
                            </span>
                        </div>
                        <a href={`https://t.me/${resumeData.personalInfo.telegram}`} target="_blank" rel="noopener" className="p-2 bg-vscode-bg border border-vscode-border rounded hover:border-vscode-accent hover:text-vscode-accent transition-colors text-vscode-text" aria-label="Telegram">
                            <Send size={18} />
                        </a>
                    </div>

                    <a href="/resume.pdf" download="Aryan_Jain_Resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full">
                        <Button variant="outline" className="w-full gap-2 border-vscode-accent text-vscode-accent hover:bg-vscode-accent hover:text-vscode-bg transition-all">
                            <FileDown size={16} />
                            <span>Download CV</span>
                        </Button>
                    </a>

                    <a href={`mailto:${resumeData.personalInfo.email}`} className="w-full">
                        <Button className="w-full gap-2 bg-vscode-text text-vscode-bg hover:bg-vscode-highlight hover:text-vscode-accent font-bold">
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
