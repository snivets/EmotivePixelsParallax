const TitleCard = () => {
  return (
    <div
      className="snap-normal snap-start"
      style={{
        backgroundColor: 'gray',
        backgroundImage: 'url(images/epbg.png)',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        backgroundPositionX: 'center',
        height: '100vh'}}
    >
      <div className="flex justify-center pt-12">
        <img src="images/eplogo.png" alt="Emotive Pixels" className="max-w-[80%] max-h-[450px]" />
      </div>
      <div className="mt-12 mx-[10vw] leading-none">
        <p className="text-3xl leading-none drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
          Emotive Pixels is a videogame podcast. We typically discuss (and spoil!) a single game - playing along is optional. Sometimes, we have multi-game episodes we call Pixel Arrays where we talk around the table about things we've been enjoying.
        </p>
        <p className="text-xl leading-none drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
          We've been at this for ten years, so there are all kinds of episodes in our backlog, often with new guests.
        </p>
      </div>
    </div>
  )
}

export default TitleCard;