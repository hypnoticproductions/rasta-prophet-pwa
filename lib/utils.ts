export interface Episode {
  id: string;
  title: string;
  description: string;
  archive_url: string;
  published_date?: string;
  created_at: string;
}

export const getDirectAudioUrl = (archiveUrl: string): string => {
  // Handle archive.org detail pages - extract the download URL
  if (archiveUrl.includes('archive.org/details/')) {
    const match = archiveUrl.match(/archive\.org\/details\/([^/?]+)/);
    if (match) {
      const identifier = match[1];
      // Try to get the MP3 file from the archive
      return `https://archive.org/download/${identifier}/`;
    }
  }
  
  // Handle direct download links
  if (archiveUrl.includes('archive.org/download/')) {
    return archiveUrl;
  }
  
  // Return original URL if we can't parse it
  return archiveUrl;
};

export const parseArchiveUrl = async (url: string): Promise<string> => {
  // For now, return the URL as-is
  // In production, you might want to fetch the archive.org page and extract the actual MP3 URL
  return url;
};

export const getArchiveMetadata = async (url: string) => {
  // Helper to get episode metadata from archive.org
  try {
    if (url.includes('archive.org/details/')) {
      const identifier = url.split('/details/')[1]?.split('/')[0];
      if (identifier) {
        return {
          identifier,
          metadataUrl: `https://archive.org/metadata/${identifier}`,
        };
      }
    }
  } catch (error) {
    console.error('Error parsing archive URL:', error);
  }
  return null;
};
