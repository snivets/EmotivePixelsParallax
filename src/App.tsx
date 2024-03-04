import './App.css'
import TitleCard from './title-card'
import EpisodePage from './episode-page'
import { Parallax } from 'react-scroll-parallax'
import { useEffect, useState } from 'react';
import useEpisodes from './hooks/useEpisodes';
import useImageFilter from './hooks/useImageFilter';

function App() {
  const [feedRss, setFeedRssRaw] = useState<string>('');
  const [episodes, setEpisodes] = useState<Episode[]>();

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
    const allEpisodes = useEpisodes(feedRss);
    setEpisodes(useImageFilter(allEpisodes));
  }, [feedRss]);

  return (
    <>
      <Parallax speed={-75}>
        <TitleCard />
      </Parallax>
      {episodes?.map((e, i) => <Parallax><EpisodePage text={e.description} title={e.title} imageFilename={e.seasonString} key={i} /></Parallax>)}
    </>
  )
}

export default App
