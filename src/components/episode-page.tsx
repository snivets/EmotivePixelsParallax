import { motion } from "framer-motion"
import DOMPurify from 'dompurify';

const EpisodePage = (props: any) => {
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
      <div className="absolute bottom-2 left-5 opacity-65 uppercase max-w-[80%] truncate">
        {props.title}
      </div>
      <div className="text-4xl m-[10%] max-h-[80%] overflow-auto no-scrollbar w-full" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.text)}} />
    </motion.div>
  )
}

export default EpisodePage;