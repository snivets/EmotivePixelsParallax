import './App.css'
import TitleCard from './components/title-card'
import EpisodePage from './components/episode-page'
import { Parallax } from 'react-scroll-parallax'
import { useEffect, useState } from 'react';
import useEpisodes from './hooks/useEpisodes';
import useShuffle from './hooks/useShuffle';
import useImageFilter from './hooks/useImageFilter';
import ConfigModal from './components/config-modal';

function App() {
  const [feedRss, setFeedRssRaw] = useState<string>('');
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [showMenu, setShowMenu] = useState(false);

  const fetchRssFeed = async () => {
    try {
      const response = await fetch('https://anchor.fm/s/4cba81a4/podcast/rss');
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
    const allEpisodes = useShuffle(useEpisodes(feedRss));
    setEpisodes(useImageFilter(allEpisodes));
  }, [feedRss]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [showMenu]);

  const handleKeyPress = (event: any) => {
    if (event.key === 'm' || event.key === 'M') {
      setShowMenu(!showMenu);
    }
  };
  

  return (
    <>
      <Parallax speed={-75}>
        <TitleCard />
      </Parallax>
      {showMenu && (
        <ConfigModal />
      )}
      {episodes?.map((e, i) => 
        <Parallax>
          <EpisodePage
            text={e.description}
            title={e.title}
            date={e.seasonString + ' ⋅ ' + e.episodeDate}
            imageFilename={e.seasonString}
            key={i} />
        </Parallax>)}
    </>
  )
}

export default App
