// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { createEpisodeCollections, parseEpisodes, shuffleEpisodes } from './episodes';
import type { Episode } from '../types/Episode';

const feed = `<?xml version="1.0"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <item>
      <title>Newest bonus</title>
      <description>&lt;p&gt;Bonus details&lt;/p&gt;</description>
      <pubDate>Mon, 06 Oct 2025 12:00:00 GMT</pubDate>
      <enclosure url="https://example.com/newest.mp3" />
      <itunes:season>5</itunes:season>
      <itunes:episodeType>bonus</itunes:episodeType>
      <itunes:duration>00:12:34</itunes:duration>
    </item>
    <item>
      <title>Older bonus</title>
      <description>Older details</description>
      <itunes:season>5</itunes:season>
      <itunes:episodeType>bonus</itunes:episodeType>
    </item>
    <item>
      <title>Season five episode</title>
      <description>Episode details</description>
      <itunes:season>5</itunes:season>
      <itunes:episode>11</itunes:episode>
      <itunes:image href="https://example.com/art.jpg" />
    </item>
    <item>
      <title>Missing season metadata</title>
      <description>Still a valid episode</description>
    </item>
    <item>
      <title></title>
      <description>Incomplete feed item</description>
    </item>
  </channel>
</rss>`;

describe('parseEpisodes', () => {
  it('parses optional metadata and assigns bonus numbers in feed order', () => {
    const episodes = parseEpisodes(feed);

    expect(episodes).toHaveLength(4);
    expect(episodes[0]).toMatchObject({
      title: 'Newest bonus',
      description: 'Bonus details</p>',
      audioUrl: 'https://example.com/newest.mp3',
      seasonString: 's5b2',
      episodeDate: 'October 2025',
      length: '00:12:34',
    });
    expect(episodes[1].seasonString).toBe('s5b1');
    expect(episodes[2]).toMatchObject({
      seasonString: 's5e11',
      imageUrl: 'https://example.com/art.jpg',
    });
    expect(episodes[3]).toMatchObject({
      seasonString: null,
      audioUrl: undefined,
      length: null,
    });
  });

  it('reports invalid XML instead of returning an empty feed', () => {
    expect(() => parseEpisodes('<rss><item></rss>')).toThrow('invalid XML');
  });
});

describe('episode transformations', () => {
  const episode = (seasonString: string, seasonNumber: number): Episode => ({
    title: seasonString,
    description: '',
    seasonNumber,
    seasonString,
    isBonus: false,
    length: null,
    hasLocalArt: false,
  });

  it('filters episodes using artwork manifests without mutating feed items', () => {
    const episodes = [
      episode('s4e1', 4),
      episode('s5e11', 5),
      episode('s5b1', 5),
      episode('s5b2', 5),
      episode('s6e1', 6),
    ];

    const collections = createEpisodeCollections(episodes);

    expect(collections.classicEpisodes.map(({ seasonString }) => seasonString)).toEqual(['s4e1']);
    expect(collections.seasonFiveEpisodes.map(({ seasonString }) => seasonString)).toEqual([
      's5e11',
      's5b2',
    ]);
    expect(collections.seasonFiveEpisodes[0].hasLocalArt).toBe(true);
    expect(collections.seasonFiveEpisodes[1].hasLocalArt).toBe(true);
    expect(episodes[1].hasLocalArt).toBe(false);
  });

  it('shuffles a copy and leaves the source array unchanged', () => {
    const episodes = [episode('s4e1', 4), episode('s4e2', 4), episode('s4e3', 4)];
    vi.spyOn(Math, 'random').mockReturnValue(0);

    try {
      const shuffled = shuffleEpisodes(episodes);
      expect(shuffled).toEqual([episodes[1], episodes[2], episodes[0]]);
      expect(episodes.map(({ seasonString }) => seasonString)).toEqual(['s4e1', 's4e2', 's4e3']);
      expect(shuffled).not.toBe(episodes);
    } finally {
      vi.restoreAllMocks();
    }
  });
});
