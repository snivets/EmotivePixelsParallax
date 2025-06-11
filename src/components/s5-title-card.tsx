import '../styles/s5-title-card.css';

export function S5TitleCard() {
  return (
    <div className="page-container snap-normal snap-start h-screen flex bg-white" style={{ fontFamily: "'Libre Franklin', sans-serif" }}>

      <div className="text-container">
        <div>
          <p className="text-3xl text-black text-right dense-text">
            Emotive Pixels is a videogame podcast. We typically discuss (and spoil!) a single game - playing along is optional. Sometimes, we have multi-game episodes we call Pixel Arrays where we each bring interesting small games to the table.
          </p>
          <p className="text-l text-black text-right dense-text">
            It's season 5! Nate is trying to catch back up with big AAA games in 2025 to see what they're up to, and what they're able to do (if anything) that indie games can't. What do you get with the planet's biggest entertainment budgets? Let's find out!
          </p>
          <div className="flex justify-end space-x-4 mt-5 mr-5 invert">
            <a
              href="https://podcasts.apple.com/us/podcast/emotive-pixels-10-years-of-friendship-and-videogames/id888205890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/apple-podcasts-icon.svg"
                alt="Apple Podcasts"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://open.spotify.com/show/0DWpmFcqfxZwXyPF2KO"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/spotify-icon.svg"
                alt="Spotify"
                className="w-6 h-6"
              />
            </a>
            <a
              href="https://pca.st/gbxx2for"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/pocket-casts-icon.svg"
                alt="Pocket Casts"
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </div>

      <img
        loading="lazy"
        src="/images/s5-logo.svg"
        alt="Emotive Pixels milkshake, drawn in a line with splotches of color"
        className="image-container"
      />

      <img
        src="/images/s5-logotype.svg"
        alt="Emotive Pixels"
        className="s5-title-logotype"
      />
    </div>
  );
}