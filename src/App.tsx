import './styles/App.css'
import TitleCard from './components/title-card'
import EpisodePage from './components/episode-page'
import { Parallax } from 'react-scroll-parallax'
import { useEffect, useState } from 'react';
import useEpisodes from './hooks/useEpisodes';
import useShuffle from './hooks/useShuffle';
import useImageFilter from './hooks/useImageFilter';
import ConfigModal from './components/config-modal';
import useOptionsStore from './stores/optionsStore';

function App() {
  const [feedRss, setFeedRssRaw] = useState<string>('');
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [showMenu, setShowMenu] = useState(false);
  const shuffleEpisodes = useOptionsStore((state) => state.shuffleEpisodes);

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
    let eps = useEpisodes(feedRss);
    if (shuffleEpisodes)
      eps = useShuffle(eps);
    setEpisodes(useImageFilter(eps));
  }, [feedRss, shuffleEpisodes]);
  
  return (
    <div onClick={() => setShowMenu(!showMenu)}>
      <Parallax speed={-75}>
        <TitleCard />
      </Parallax>
      {showMenu && (
        <ConfigModal />
      )}
      {episodes?.map((e) => 
        <Parallax key={e.seasonString}>
          <EpisodePage
            text={e.description}
            title={e.title}
            date={e.seasonString + ' ⋅ ' + e.episodeDate}
            imageFilename={e.seasonString}/>
        </Parallax>)}
    </div>
  )
}

export default App
