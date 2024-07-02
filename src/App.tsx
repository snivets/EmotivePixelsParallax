import { Fragment, useEffect, useState } from 'react';
import useEpisodes from './hooks/useEpisodes';
import useImageFilter from './hooks/useImageFilter';
import useShuffle from './hooks/useShuffle';
import useOptionsStore from './stores/optionsStore';
import { TitleCard, EpisodePage, ConfigModal, ScrollHinter } from './components/';
import './styles/style-overrides.css';

export default function App() {
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
    <Fragment>
      <div onClick={() => setShowMenu(!showMenu)}>
        <TitleCard />
        {showMenu && <ConfigModal />}
        {episodes && <ScrollHinter />}
      </div>
      {episodes?.map((e) =>
        <EpisodePage
          text={e.description}
          title={e.title}
          date={e.seasonString + ' ⋅ ' + e.episodeDate}
          audio={e.audioUrl}
          imageFilename={e.seasonString} />
      )}
    </Fragment>
  )
}