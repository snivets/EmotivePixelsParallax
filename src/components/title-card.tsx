import { motion } from "framer-motion"

const TitleCard = () => {
  return (
    <motion.div
      className="full-page"
      style={{
        backgroundColor: 'gray',
        backgroundImage: 'url(images/epbg.png)',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        backgroundPositionX: 'center',
        height: '100vh'}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-center pt-12">
        <img src="images/eplogo.png" alt="Emotive Pixels" className="max-w-[80%]" />
      </div>
      <div className="mt-12 mx-[10vw] leading-none">
        <p className="text-3xl leading-none">
          Emotive Pixels is a videogame podcast. We typically discuss (and spoil!) a single game - playing along is optional. Sometimes, we have multi-game episodes we call Pixel Arrays where we talk around the table about things we've been enjoying.
        </p>
        <p className="text-xl leading-none">
          We've been at this for ten years, so there are all kinds of episodes in our backlog, often with new guests.
        </p>
      </div>
    </motion.div>
  )
}

export default TitleCard;