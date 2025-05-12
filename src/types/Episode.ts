interface Episode {
  title: string;
  description: string;
  audioUrl?: string;
  imageUrl?: string | null;
  seasonNumber?: number;
  episodeNumber?: number;
  seasonString: string | null;
  episodeDate?: string;
  isBonus: boolean;
  length: string | null;
  hasLocalArt?: boolean; //Only really used for S5
}