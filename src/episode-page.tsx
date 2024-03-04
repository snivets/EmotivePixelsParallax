import { motion } from "framer-motion"
import DOMPurify from 'dompurify';

const EpisodePage = (props: any) => {
  return (
    <motion.div
      className="full-page"
      style={{ height: '100vh', backgroundImage: 'url(/src/images/' + props.imageFilename + '.jpg)',  backgroundSize: 'cover', backgroundPositionY: 'center' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-4xl p-[20%]" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.text)}} />
    </motion.div>
  )
}

export default EpisodePage;