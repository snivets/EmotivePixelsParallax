import DOMPurify from 'dompurify';
import useOptionsStore from "../stores/optionsStore";

export function EpisodePage(props: any) {
  const showDates = useOptionsStore((state) => state.showDates);

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
    >
      {showDates && <div className="absolute bottom-7 left-5 opacity-30 uppercase max-w-[80%] truncate text-xs">
        {props.date}
      </div>}
      <div className="absolute bottom-2 left-5 opacity-65 uppercase max-w-[80%] truncate">
        {props.title}
      </div>
      <div
        className="text-4xl m-[10%] max-h-[90vh] w-full drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.text) }} />
    </div>
  )
}