import DOMPurify from 'dompurify';
import '../styles/s5-card-styles.css';

export function S5EpisodePage(props: any) {
  // Extract "Book Club: " tag from title if present
  const bookClubMatch = props.title?.match(/^Book Club: (.+)$/);
  const hasBookClubTag = !!bookClubMatch;
  const displayTitle = bookClubMatch ? bookClubMatch[1] : props.title;

  return (
    <div className="s5-episode-card snap-normal snap-start" data-season={props.seasonString}>
      {props.hasLocalArt && (
        <img
          src={`images/svgs/${props.seasonString}.svg`}
          alt="Single line art by Vicki Jee"
          loading="lazy"
          className="s5-episode-image"
        />
      )}
      {!props.hasLocalArt && (
        <img
          src={props.episodeArtUrl}
          loading="lazy"
          className="s5-episode-image" />
      )}
      <div>
        <h1 className="text-4xl mb-2 italic">
          {hasBookClubTag && (
            <span className="inline-block border-2 border-black rounded px-2 py-0.5 mr-2 text-sm font-bold tracking-wide relative -top-1 -bottom-1 md:-top-2 md:-bottom-2">BOOK CLUB</span>
          )}
          {displayTitle}
        </h1>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.text) }} />
      </div>
    </div>
  );
}