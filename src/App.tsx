import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ConfigModal } from './components/config-modal';
import { EpisodePage } from './components/episode-page';
import { S5EpisodePage } from './components/s5-episode-page';
import { S5TitleCard } from './components/s5-title-card';
import { ScrollHinter } from './components/scroll-hinter';
import { createEpisodeCollections, parseEpisodes, shuffleEpisodes } from './data/episodes';
import type { Episode } from './types/Episode';
import useOptionsStore from './stores/optionsStore';
import './styles/style-overrides.css';

const RSS_FEED_URL = 'https://anchor.fm/s/4cba81a4/podcast/rss';

function AppContent() {
  const [episodes, setEpisodes] = useState<Episode[] | null>(null);
  const [feedError, setFeedError] = useState<string | null>(null);
  const shuffle = useOptionsStore((state) => state.shuffleEpisodes);
  const { pathname } = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    async function loadFeed() {
      try {
        const response = await fetch(RSS_FEED_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Podcast feed request failed (${response.status} ${response.statusText}).`);
        }
        setEpisodes(parseEpisodes(await response.text()));
      } catch (error) {
        if (controller.signal.aborted) return;
        const message = error instanceof Error ? error.message : 'Unknown error.';
        console.error('Podcast feed could not be loaded:', error);
        setFeedError(`Unable to load podcast episodes. ${message}`);
      }
    }

    void loadFeed();
    return () => controller.abort();
  }, []);

  const collections = useMemo(() => {
    const orderedEpisodes = episodes ?? [];
    return createEpisodeCollections(shuffle ? shuffleEpisodes(orderedEpisodes) : orderedEpisodes);
  }, [episodes, shuffle]);
  const seasonStrings = useMemo(
    () => [
      ...collections.seasonFiveEpisodes,
      ...collections.classicEpisodes,
    ].flatMap((episode) => episode.seasonString ? [episode.seasonString] : []),
    [collections],
  );

  useEffect(() => {
    const seasonString = pathname.split('/').filter(Boolean)[0];
    if (!seasonString || !seasonStrings.includes(seasonString)) return;
    const element = Array.from(document.querySelectorAll<HTMLElement>('[data-season]'))
      .find((candidate) => candidate.dataset.season === seasonString);
    element?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }, [pathname, seasonStrings]);

  return (
    <>
      <S5TitleCard />
      <ConfigModal />
      {episodes && episodes.length > 0 && <ScrollHinter />}
      {feedError && (
        <p role="alert" className="fixed inset-x-4 top-4 z-50 rounded bg-red-100 p-4 text-left text-red-900">
          {feedError}
        </p>
      )}
      <Routes>
        <Route index element={null} />
        <Route path=":podcastString" element={null} />
      </Routes>
      {collections.seasonFiveEpisodes.map((episode) => (
        <S5EpisodePage key={episode.seasonString ?? episode.title} episode={episode} />
      ))}
      {collections.classicEpisodes.map((episode) => (
        <EpisodePage key={episode.seasonString ?? episode.title} episode={episode} />
      ))}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
