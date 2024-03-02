import { motion } from "framer-motion"

const TitleCard = () => {
  return (
    <motion.div
      className="full-page"
      style={{ backgroundColor: 'gray', backgroundImage: 'url(./images/epbg.png)', backgroundSize: 'cover', backgroundPositionY: 'center', height: '100vh'}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="pt-[100px] text-2xl">welcome to</h2>
      <h1 className="text-8xl italic">Emotive Pixels</h1>
      <div className="m-[20%] text-4xl">We are a podcast about videogames. Usually, we gather and talk freely about a single game, but sometimes,  we also hang out and casually discuss what we've been playing.</div>
    </motion.div>
  )
}

export default TitleCard;

