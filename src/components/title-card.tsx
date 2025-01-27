export function TitleCard() {
  return (
    <div
      className="snap-normal snap-start"
      style={{
        backgroundColor: 'gray',
        backgroundImage: 'url(images/epbg.png)',
        backgroundSize: 'cover',
        backgroundPositionY: 'center',
        backgroundPositionX: 'center',
        height: '100vh'
      }}
    >
      <div className="flex justify-center pt-12">
        <img src="images/eplogo.png" alt="Emotive Pixels" className="max-w-[80%] max-h-[450px]" />
      </div>
      <div className="mt-12 mx-[10vw] leading-none">
        <p className="text-3xl leading-none drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
          Emotive Pixels is a videogame podcast. We typically discuss (and spoil!) a single game - playing along is optional. Sometimes, we have multi-game episodes we call Pixel Arrays where we talk around the table about things we've been enjoying.
        </p>
        <p className="text-xl leading-none drop-shadow-[0_5px_5px_rgba(0,0,0,1)]">
          In our tenth year, we are inspecting the current state of AAA gaming, asking what its relevance is in a world of indies of ever-increasing scope.
        </p>
        <p className="flex justify-center space-x-4 mt-4">
          <a href="https://podcasts.apple.com/us/podcast/emotive-pixels-10-years-of-friendship-and-videogames/id888205890" target="_blank" rel="noopener noreferrer">
            <img src="images/apple-podcasts-icon.svg" alt="Apple Podcasts" className="w-6 h-6" />
          </a>
          <a href="https://open.spotify.com/show/0DWpmFcqfxQpxZwXyPF2KO" target="_blank" rel="noopener noreferrer">
            <img src="images/spotify-icon.svg" alt="Spotify" className="w-6 h-6" />
          </a>
          <a href="https://pca.st/gbxx2for" target="_blank" rel="noopener noreferrer">
            <img src="images/pocket-casts-icon.svg" alt="Pocket Casts" className="w-6 h-6" />
          </a>
        </p>
      </div>
    </div>
  )
}