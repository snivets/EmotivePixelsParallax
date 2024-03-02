import { motion } from "framer-motion"

const EpisodePage = (props: any) => {
  return (
    <motion.div
      className="full-page"
      style={{ height: '100vh', backgroundImage: 'url(/images/s4e1.jpg)',  backgroundSize: 'cover', backgroundPositionY: 'center' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-4xl p-[20%]">{props.text}</div>
    </motion.div>
  )
}

export default EpisodePage;