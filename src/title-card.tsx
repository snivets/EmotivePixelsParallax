import { motion } from "framer-motion"

const TitleCard = () => {
  return (
    <motion.div
      className="full-page"
      style={{ backgroundColor: 'gray', backgroundImage: 'url(images/epbg.png)', backgroundSize: 'cover', backgroundPositionY: 'center', height: '100vh'}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-center pt-12">
        <img src="images/eplogo.png" alt="Emotive Pixels" />
      </div>
      <div className="mt-12 mx-[20%] text-4xl">We are a podcast about videogames. Usually, we gather and talk freely about a single game, but sometimes,  we also hang out and casually discuss what we've been playing.</div>
    </motion.div>
  )
}

export default TitleCard;

