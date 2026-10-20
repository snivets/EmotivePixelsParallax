import DOMPurify from 'dompurify';
import '../styles/s5-card-styles.css';
import type { Episode } from '../types/Episode';

export function S5EpisodePage({ episode }: { episode: Episode }) {
  // Extract "Book Club: " tag from title if present
  const bookClubMatch = episode.title.match(/^Book Club: (.+)$/);
  const hasBookClubTag = !!bookClubMatch;
  const displayTitle = bookClubMatch ? bookClubMatch[1] : episode.title;

  return (
    <div className="s5-episode-card snap-normal snap-start" data-season={episode.seasonString ?? undefined}>
      {episode.hasLocalArt && episode.seasonString && (
        <img
          src={`/images/svgs/${episode.seasonString}.svg`}
          alt={`Single-line artwork for ${episode.title} by Vicki Jee`}
          loading="lazy"
          className="s5-episode-image"
        />
      )}
      {!episode.hasLocalArt && episode.imageUrl && (
        <img
          src={episode.imageUrl}
          alt={`Artwork for ${episode.title}`}
          loading="lazy"
          className="s5-episode-image"
        />
      )}
      <div>
        <h1 className="text-4xl mb-2 italic">
          {hasBookClubTag && (
            <span className="inline-block border-2 border-black rounded px-2 py-0.5 mr-2 text-sm font-bold tracking-wide relative -top-1 -bottom-1 md:-top-2 md:-bottom-2">BOOK CLUB</span>
          )}
          {displayTitle}
        </h1>
        <div
          className="episode-description"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(episode.description) }}
        />
      </div>
    </div>
  );
}