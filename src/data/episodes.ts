import { hasEpisodeBackground, hasSeasonFiveArtwork } from './episode-art';
import type { Episode } from '../types/Episode';

function getElementText(parent: Element, tagName: string): string | undefined {
  const text = parent.getElementsByTagName(tagName)[0]?.textContent?.trim();
  return text || undefined;
}

function parseEpisodeNumber(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function parseEpisodes(feedXml: string): Episode[] {
  const document = new DOMParser().parseFromString(feedXml, 'application/xml');
  if (document.querySelector('parsererror')) {
    throw new Error('The podcast feed contains invalid XML.');
  }

  const items = Array.from(document.getElementsByTagName('item'));
  const bonusTotals = new Map<number, number>();
  for (const item of items) {
    const season = parseEpisodeNumber(getElementText(item, 'itunes:season'));
    const isBonus = getElementText(item, 'itunes:episodeType') === 'bonus';
    if (season !== undefined && isBonus) {
      bonusTotals.set(season, (bonusTotals.get(season) ?? 0) + 1);
    }
  }

  const bonusCounts = new Map<number, number>();
  const episodes: Episode[] = [];
  for (const item of items) {
    const title = getElementText(item, 'title');
    const description = getElementText(item, 'description');
    if (!title || !description) continue;

    const seasonNumber = parseEpisodeNumber(getElementText(item, 'itunes:season'));
    const episodeNumber = parseEpisodeNumber(getElementText(item, 'itunes:episode'));
    const isBonus = getElementText(item, 'itunes:episodeType') === 'bonus';
    let seasonString: string | null = null;

    if (seasonNumber !== undefined) {
      if (isBonus) {
        const bonusCount = (bonusCounts.get(seasonNumber) ?? 0) + 1;
        bonusCounts.set(seasonNumber, bonusCount);
        const bonusNumber = (bonusTotals.get(seasonNumber) ?? bonusCount) - bonusCount + 1;
        seasonString = `s${seasonNumber}b${bonusNumber}`;
      } else if (episodeNumber !== undefined) {
        seasonString = `s${seasonNumber}e${episodeNumber}`;
      }
    }

    const publishedAt = getElementText(item, 'pubDate');
    const publishedDate = publishedAt ? new Date(publishedAt) : undefined;
    const imageUrl = item.getElementsByTagName('itunes:image')[0]?.getAttribute('href');
    const audioUrl = item.getElementsByTagName('enclosure')[0]?.getAttribute('url');

    episodes.push({
      title,
      description: description.startsWith('<p>') ? description.slice(3) : description,
      audioUrl: audioUrl || undefined,
      imageUrl,
      seasonNumber,
      episodeNumber,
      seasonString,
      episodeDate:
        publishedDate && !Number.isNaN(publishedDate.getTime())
          ? publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
          : undefined,
      isBonus,
      length: getElementText(item, 'itunes:duration') ?? null,
      hasLocalArt: false,
    });
  }

  return episodes;
}

export function shuffleEpisodes(episodes: Episode[]): Episode[] {
  const shuffled = [...episodes];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

export interface EpisodeCollections {
  classicEpisodes: Episode[];
  seasonFiveEpisodes: Episode[];
}

export function createEpisodeCollections(episodes: Episode[]): EpisodeCollections {
  const classicEpisodes: Episode[] = [];
  const seasonFiveEpisodes: Episode[] = [];

  for (const episode of episodes) {
    if (episode.seasonNumber === 5 && episode.seasonString !== 's5b1') {
      seasonFiveEpisodes.push({
        ...episode,
        hasLocalArt: hasSeasonFiveArtwork(episode.seasonString),
      });
    } else if (hasEpisodeBackground(episode.seasonString)) {
      classicEpisodes.push(episode);
    }
  }

  return { classicEpisodes, seasonFiveEpisodes };
}
