import { motion } from "framer-motion"
import DOMPurify from 'dompurify';
import useOptionsStore from "../stores/optionsStore";

const EpisodePage = (props: any) => {
  const showDates = useOptionsStore((state) => state.showDates);

  return (
    <motion.div
      className="full-page relative flex items-center"
      style={{
        height: '100vh',
        backgroundImage: 'url(images/' + props.imageFilename + '.jpg)',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        backgroundPositionX: 'center', }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {showDates && <div className="absolute bottom-7 left-5 opacity-30 uppercase max-w-[80%] truncate text-xs">
        {props.date}
      </div>}
      <div className="absolute bottom-2 left-5 opacity-65 uppercase max-w-[80%] truncate">
        {props.title}
      </div>
      <div
        className="text-4xl m-[10%] max-h-[90vh] w-full drop-shadow-[0_3px_3px_rgba(0,0,0,0.5)]"
        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.text)}} />
    </motion.div>
  )
}

export default EpisodePage;