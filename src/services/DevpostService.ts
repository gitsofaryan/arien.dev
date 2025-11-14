import { supabase } from '@/integrations/supabase/client';

export interface DevpostProject {
  title: string;
  link: string;
  description: string;
  image: string | null;
}

export interface DevpostData {
  projects: DevpostProject[];
  hackathonCount: number;
  success: boolean;
}

export const devpostService = {
  async fetchProjects(username: string): Promise<DevpostData> {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-devpost-projects', {
        body: { username }
      });

      if (error) throw error;

      return data as DevpostData;
    } catch (error) {
      console.error('Error fetching Devpost projects:', error);
      throw error;
    }
  },

  async saveProjects(userId: string, projects: DevpostProject[]) {
    try {
      const projectsToInsert = projects.map(project => ({
        user_id: userId,
        title: project.title,
        description: project.description,
        link: project.link,
        image: project.image,
        source: 'devpost',
        external_id: project.link,
      }));

      const { error } = await supabase
        .from('projects')
        .upsert(projectsToInsert, { 
          onConflict: 'external_id',
          ignoreDuplicates: true 
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving Devpost projects:', error);
      throw error;
    }
  },
};
