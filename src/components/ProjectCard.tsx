import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from 'lucide-react';
import { ProjectRepo } from '@/data/projects';

// Define interface for ProjectCard props
interface ProjectCardProps {
    project: ProjectRepo;
    onReadmeClick?: () => void;
}

// Memoized ProjectCard component
const ProjectCard = memo(({ project, onReadmeClick }: ProjectCardProps) => (
    <Card
        className="h-full bg-vscode-sidebar border border-vscode-border hover:border-vscode-accent transition-all duration-300 hover:shadow-md cursor-pointer group"
        onClick={onReadmeClick}
    >
        <CardHeader className="p-4">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-vscode-text group-hover:text-vscode-accent transition-colors">
                        {project.title}
                    </CardTitle>
                    <CardDescription className="text-vscode-text/60 mt-1">
                        {project.description}
                    </CardDescription>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={18} className="text-vscode-accent" />
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
            <div className="flex flex-wrap gap-2 mt-3">
                {project.tech?.map(tag => (
                    <span
                        key={`${project.id}-${tag}`}
                        className="text-xs px-2 py-1 bg-vscode-highlight rounded hover:bg-vscode-highlight/80 transition-colors"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </CardContent>
    </Card>
));

export default ProjectCard;
