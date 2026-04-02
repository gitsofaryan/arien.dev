import { useState, useEffect } from "react";

export const useGitHubReadme = (owner: string, repo: string) => {
  const [readme, setReadme] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const tryRawReadme = async () => {
      const branches = ["main", "master", "develop"];
      const filenames = [
        "README.md",
        "Readme.md",
        "readme.md",
        "README.MD",
        "README.rst",
        "README",
      ];

      for (const branch of branches) {
        for (const filename of filenames) {
          const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filename}`;
          const response = await fetch(url);

          if (!response.ok) {
            continue;
          }

          const content = await response.text();
          if (content && !content.startsWith("404: Not Found")) {
            return content;
          }
        }
      }

      return null;
    };

    const tryApiReadme = async () => {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/readme`,
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
        },
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      if (data?.content && data?.encoding === "base64") {
        try {
          return atob(data.content.replace(/\n/g, ""));
        } catch {
          return null;
        }
      }

      if (typeof data === "string" && data.trim().length > 0) {
        return data;
      }

      return null;
    };

    const fetchReadme = async () => {
      if (!owner || !repo) return;

      setIsLoading(true);
      setError(null);

      try {
        const rawContent = await tryRawReadme();
        if (!isCancelled && rawContent && rawContent.trim().length > 0) {
          setReadme(rawContent);
          setError(null);
          return;
        }

        const apiContent = await tryApiReadme();
        if (!isCancelled && apiContent && apiContent.trim().length > 0) {
          setReadme(apiContent);
          setError(null);
          return;
        }

        if (!isCancelled) {
          setError("Unable to fetch README");
          setReadme("");
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Failed to fetch README:", err);
          setError("Unable to fetch README");
          setReadme("");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchReadme();

    return () => {
      isCancelled = true;
    };
  }, [owner, repo]);

  return { readme, isLoading, error };
};
