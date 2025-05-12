import DOMPurify from 'dompurify';
import '../styles/s5-card-styles.css';

export function S5EpisodePage(props: any) {
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
        <h1 className="text-4xl mb-2 italic">{props.title}</h1>
        <div
          className="text-3xl"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.text) }} />
      </div>
    </div>
  );
}