import DOMPurify from 'dompurify';
import { useId, useState } from 'react';
import useOptionsStore from '../stores/optionsStore';
import type { Episode } from '../types/Episode';

export function EpisodePage({ episode }: { episode: Episode }) {
  const showDates = useOptionsStore((state) => state.showDates);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioPlayerId = useId();

  return (
    <div
      className="relative flex items-center snap-normal snap-start"
      style={{
        height: '100vh',
        backgroundImage: `url(/images/${episode.seasonString}.jpg)`,
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        backgroundPositionX: 'center',
      }}
      data-season={episode.seasonString ?? undefined}
    >
      {showDates && episode.episodeDate && (
        <div className="absolute bottom-7 left-5 max-w-[80%] truncate text-xs uppercase opacity-40 drop-shadow-[0_1px_1px_rgba(0,0,0,1.0)]">
          {[episode.seasonString, episode.episodeDate].filter(Boolean).join(' ⋅ ')}
        </div>
      )}
      <div className="absolute bottom-2 left-5 max-w-[60%] truncate uppercase opacity-60 drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]">
        {episode.title}
      </div>
      {episode.audioUrl && (
        <>
          <button
            type="button"
            className="absolute bottom-2 right-4 rounded px-2 opacity-80 drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2"
            aria-expanded={showPlayer}
            aria-controls={audioPlayerId}
            onClick={() => setShowPlayer((visible) => !visible)}
          >
            {episode.length ?? 'Listen'} {showPlayer ? '⏸' : '⏯'}
          </button>
          <div id={audioPlayerId} hidden={!showPlayer} className="absolute bottom-14 right-10">
            {showPlayer && <audio src={episode.audioUrl} controls preload="metadata" />}
          </div>
        </>
      )}
      <div
        className="episode-description m-[10%] max-h-[90vh] w-full text-4xl drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(episode.description) }}
      />
    </div>
  );
}