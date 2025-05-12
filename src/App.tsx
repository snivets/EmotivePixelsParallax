import { useEffect, useState } from 'react';
import useEpisodes from './hooks/useEpisodes';
import useImageFilter from './hooks/useImageFilter';
import useShuffle from './hooks/useShuffle';
import useSplitS5Episodes from './hooks/useSplitS5Episodes';
import useOptionsStore from './stores/optionsStore';
import { TitleCard, EpisodePage, S5EpisodePage, ConfigModal, ScrollHinter } from './components/';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import './styles/style-overrides.css';
import { quotes } from './quotes';

export default function App() {
  const [feedRss, setFeedRssRaw] = useState<string>('');
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [s5Episodes, setS5Episodes] = useState<Episode[]>();
  const [showMenu, setShowMenu] = useState(false);
  const shuffleEpisodes = useOptionsStore((state) => state.shuffleEpisodes);

  const fetchRssFeed = async () => {
    try {
      const response = await fetch('https://anchor.fm/s/4cba81a4/podcast/rss');
      if (!response.ok) {
        console.error('Failed to fetch RSS feed:', response.status, response.statusText);
        return;
      }
      setFeedRssRaw(await response.text());
    } catch (error) {
      console.error('Podcast fetch failed: ', error);
    }
  };

  // Get podcast XML data on page load
  useEffect(() => {
    fetchRssFeed();
  }, []);

  useEffect(() => {
    let eps = useEpisodes(feedRss);
    if (shuffleEpisodes)
      eps = useShuffle(eps);
    setEpisodes(useImageFilter(eps));
    setS5Episodes(useSplitS5Episodes(eps));
  }, [feedRss, shuffleEpisodes]);

  const scrollToEpisode = (seasonString: string) => {
    const element = document.querySelector(`[data-season="${seasonString}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const EpisodeRoute = () => {
    const { podcastString } = useParams<{ podcastString: string }>();
    useEffect(() => {
      if (podcastString) {
        scrollToEpisode(podcastString);
      }
    }, [podcastString]);

    return null;
  };

  function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  return (
    <Router>
      <div onClick={() => setShowMenu(!showMenu)}>
        <TitleCard />
        {showMenu && <ConfigModal />}
        {episodes && <ScrollHinter />}
      </div>
      <Routes>
        <Route path="/" element={<div><i>{getRandomQuote()}</i></div>} />
        <Route path="/:podcastString" element={<EpisodeRoute />} />
      </Routes>
      {s5Episodes?.map((e) =>
        <S5EpisodePage
          key={e.title}
          seasonString={e.seasonString}
          hasLocalArt={e.hasLocalArt}
          episodeArtUrl={e.imageUrl}
          text={e.description}
          title={e.title}
          audio={e.audioUrl}
          length={e.length} />
      )}
      {episodes?.map((e) =>
        <EpisodePage
          key={e.title}
          text={e.description}
          title={e.title}
          date={e.seasonString + ' ⋅ ' + e.episodeDate}
          audio={e.audioUrl}
          imageFilename={e.seasonString}
          length={e.length} />
      )}
    </Router>
  )
}