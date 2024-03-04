// Get an array of all episodes and their descriptive text
function useEpisodes(feedRss: string): Episode[] {
  var episodesXml = new window.DOMParser()
    .parseFromString(feedRss, 'text/xml')
    .querySelectorAll("item");

  var episodes: Episode[] = [];
  episodesXml.forEach(e => {
    const title = e.querySelector('title')?.textContent;
    let desc = e.querySelector('description')?.textContent;

    let imageUrl = null;
    const image = e.getElementsByTagName('itunes:image')[0];
    if (image) {
      imageUrl = image.getAttribute('href');
    }
    const season = e.getElementsByTagName('itunes:season')[0];
    const episode = e.getElementsByTagName('itunes:episode')[0];
    let seasonNumber;
    if (season && season.textContent) {
      seasonNumber = parseInt(season.textContent);
    }
    let episodeNumber;
    if (episode && episode.textContent) {
      episodeNumber = parseInt(episode.textContent);
    }
    let seasonString = `s${seasonNumber}e${episodeNumber}`;
    
    if (!title || !desc) return;

    if (desc.startsWith('<p>')) {
      desc = desc.substring(3, desc.length - 5);
    }

    episodes.push({
      title,
      description: desc,
      imageUrl,
      seasonNumber,
      episodeNumber,
      seasonString
    });
  });

  return episodes;
}

export default useEpisodes;