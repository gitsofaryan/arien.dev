import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username } = await req.json();
    
    if (!username) {
      throw new Error('Username is required');
    }

    console.log(`Fetching Devpost projects for username: ${username}`);

    // Fetch user's Devpost profile page
    const response = await fetch(`https://devpost.com/${username}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Devpost profile: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Parse projects from HTML
    const projects = [];
    const hackathonCount = parseHackathonCount(html);
    
    // Extract project information using regex
    const projectRegex = /<article[^>]*class="software-list-content"[^>]*>([\s\S]*?)<\/article>/g;
    let match;
    
    while ((match = projectRegex.exec(html)) !== null) {
      const projectHtml = match[1];
      
      const titleMatch = /<h5[^>]*>([\s\S]*?)<\/h5>/.exec(projectHtml);
      const linkMatch = /href="([^"]*)"/.exec(projectHtml);
      const descMatch = /<p[^>]*class="software-description"[^>]*>([\s\S]*?)<\/p>/.exec(projectHtml);
      const imgMatch = /<img[^>]*src="([^"]*)"/.exec(projectHtml);
      
      if (titleMatch && linkMatch) {
        projects.push({
          title: titleMatch[1].trim().replace(/<[^>]*>/g, ''),
          link: linkMatch[1].startsWith('http') ? linkMatch[1] : `https://devpost.com${linkMatch[1]}`,
          description: descMatch ? descMatch[1].trim().replace(/<[^>]*>/g, '') : '',
          image: imgMatch ? imgMatch[1] : null,
        });
      }
    }

    console.log(`Found ${projects.length} projects and ${hackathonCount} hackathons`);

    return new Response(
      JSON.stringify({ 
        projects, 
        hackathonCount,
        success: true 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error fetching Devpost projects:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

function parseHackathonCount(html: string): number {
  // Look for hackathon participation count in the profile
  const hackathonMatch = /(\d+)\s+hackathons?\s+attended/i.exec(html) ||
                        /attended\s+(\d+)\s+hackathons?/i.exec(html) ||
                        /<span[^>]*>(\d+)<\/span>\s*hackathons?/i.exec(html);
  
  if (hackathonMatch) {
    return parseInt(hackathonMatch[1], 10);
  }
  
  return 0;
}
