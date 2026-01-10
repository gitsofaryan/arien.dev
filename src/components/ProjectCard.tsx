import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Define interface for ProjectData
export interface ProjectData {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    tags: string[];
}

// Define interface for ProjectCard props
interface ProjectCardProps {
    project: ProjectData;
}

// Memoized ProjectCard component
const ProjectCard = memo(({ project }: ProjectCardProps) => (
    <Link to={project.link} className="block">
        <Card className="h-full bg-vscode-sidebar border border-vscode-border hover:border-vscode-accent transition-all duration-300 hover:shadow-md">
            <CardHeader className="p-4">
                <CardTitle className="text-xl font-bold text-vscode-text">{project.title}</CardTitle>
                <CardDescription className="text-vscode-text/60">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map(tag => (
                        <span key={`${project.id}-${tag}`} className="text-xs px-2 py-1 bg-vscode-highlight rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </CardContent>
        </Card>
    </Link>
));

export default ProjectCard;
