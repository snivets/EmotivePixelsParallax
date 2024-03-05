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
        <img src="images/eplogo.png" alt="Emotive Pixels" className="max-w-[80%]" />
      </div>
      <div className="mt-12 mx-[10vw] text-3xl">
        <p>
          Emotive Pixels is a videogame podcast. We typically discuss (and spoil!) a single game in a way you don't have to play along to enjoy, but sometimes we have multi-game episodes we call Pixel Arrays where we talk about anything we've been enjoying.
        </p>
        <p className="text-xl">
          We've been at this for ten years, so there are all kinds of episodes in our backlog, often with new guests.
        </p>
      </div>
    </motion.div>
  )
}

export default TitleCard;