import DOMPurify from 'dompurify';
import useOptionsStore from "../stores/optionsStore";
import { useState } from 'react';

export function EpisodePage(props: any) {
  const showDates = useOptionsStore((state) => state.showDates);
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div
      className="relative flex items-center snap-normal snap-start"
      style={{
        height: '100vh',
        backgroundImage: 'url(images/' + props.imageFilename + '.jpg)',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        backgroundPositionX: 'center',
      }}
      data-season={props.imageFilename}
    >
      {showDates && <div className="absolute bottom-7 left-5 opacity-40 uppercase max-w-[80%] truncate text-xs drop-shadow-[0_1px_1px_rgba(0,0,0,1.0)]">
        {props.date}
      </div>}
      <div className="absolute bottom-2 left-5 opacity-60 uppercase max-w-[60%] truncate drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]">
        {props.title}
      </div>
      <div className="absolute bottom-2 right-4 opacity-60 cursor-pointer drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]" onClick={() => setShowPlayer(!showPlayer)}>
        {props.length} ⏯
      </div>
      <div hidden={!showPlayer} className="absolute bottom-14 right-10">
        <audio src={props.audio} controls preload="metadata" />
      </div>
      <div
        className="text-4xl m-[10%] max-h-[90vh] w-full drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.text) }} />
    </div>
  )
}