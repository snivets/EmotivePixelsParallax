const episodeBackgrounds = new Set([
  's1e36',
  's1e49',
  's1e52',
  's2e1',
  's2e2',
  's2e3',
  's2e4',
  's2e5',
  's2e6',
  's2e7',
  's2e8',
  's2e9',
  's2e10',
  's3e1',
  's3e3',
  's3e4',
  's3e5',
  's3e6',
  's3e7',
  's3e8',
  's3e9',
  's3e10',
  's3e11',
  's3e12',
  's3e13',
  's4e1',
  's4e2',
  's4e3',
  's4e4',
  's4e5',
  's4e6',
  's4e7',
  's4e8',
  's4e9',
  's4e10',
]);

const seasonFiveArtwork = new Set([
  's5b2',
  's5e1',
  's5e2',
  's5e3',
  's5e4',
  's5e5',
  's5e6',
  's5e7',
  's5e8',
  's5e9',
  's5e10',
  's5e11',
]);

export function hasEpisodeBackground(seasonString: string | null): boolean {
  return seasonString !== null && episodeBackgrounds.has(seasonString);
}

export function hasSeasonFiveArtwork(seasonString: string | null): boolean {
  return seasonString !== null && seasonFiveArtwork.has(seasonString);
}
