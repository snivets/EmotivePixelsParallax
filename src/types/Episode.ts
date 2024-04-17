interface Episode {
  title: string;
  description: string;
  imageUrl?: string | null;
  seasonNumber?: number;
  episodeNumber?: number;
  seasonString?: string | null;
  episodeDate?: string;
  isBonus: boolean;
}