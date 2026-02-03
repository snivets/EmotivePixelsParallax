// Get an array of all episodes and their descriptive text
function useEpisodes(feedRss: string): Episode[] {
  var episodesXml = new window.DOMParser()
    .parseFromString(feedRss, 'text/xml')
    .querySelectorAll("item");

  // First pass: count total bonus episodes per season
  const bonusTotalBySeason: Record<number, number> = {};
  episodesXml.forEach(e => {
    const season = e.getElementsByTagName('itunes:season')[0];
    const isBonus = e.getElementsByTagName('itunes:episodeType')[0]?.textContent == 'bonus';
    if (season && season.textContent && isBonus) {
      const seasonNumber = parseInt(season.textContent);
      bonusTotalBySeason[seasonNumber] = (bonusTotalBySeason[seasonNumber] || 0) + 1;
    }
  });

  var episodes: Episode[] = [];
  const bonusCountBySeason: Record<number, number> = {};
  episodesXml.forEach(e => {
    const title = e.querySelector('title')?.textContent;
    let desc = e.querySelector('description')?.textContent;
    const dateStr = e.querySelector('pubDate')?.textContent;
    const audioUrl = e.getElementsByTagName('enclosure')[0].getAttribute('url')?.toString();
    let date;
    if (dateStr) {
      date = new Date(dateStr)
        .toLocaleDateString('en-us', { year: "numeric", month: "long" });
    }

    let imageUrl = null;
    const image = e.getElementsByTagName('itunes:image')[0];
    if (image) {
      imageUrl = image.getAttribute('href');
    }
    // The colon seems to throw querySelector.
    const length = e.getElementsByTagName('itunes:duration')[0].textContent;
    const season = e.getElementsByTagName('itunes:season')[0];
    const episode = e.getElementsByTagName('itunes:episode')[0];
    const isBonus = e.getElementsByTagName('itunes:episodeType')[0]?.textContent == 'bonus';
    let seasonNumber;
    if (season && season.textContent) {
      seasonNumber = parseInt(season.textContent);
    }
    let episodeNumber;
    if (episode && episode.textContent) {
      episodeNumber = parseInt(episode.textContent);
    }
    let seasonString: string | null = null;
    if (seasonNumber) {
      if (isBonus) {
        bonusCountBySeason[seasonNumber] = (bonusCountBySeason[seasonNumber] || 0) + 1;
        const bonusNumber = bonusTotalBySeason[seasonNumber] - bonusCountBySeason[seasonNumber] + 1;
        seasonString = `s${seasonNumber}b${bonusNumber}`;
        console.log(seasonString + ' for ' + title);
      } else {
        seasonString = `s${seasonNumber}e${episodeNumber}`;
      }
    }

    if (!title || !desc) return;

    if (desc.startsWith('<p>')) {
      desc = desc.substring(3);
    }

    episodes.push({
      title,
      description: desc,
      audioUrl,
      imageUrl,
      seasonNumber,
      episodeNumber,
      seasonString,
      episodeDate: date,
      isBonus,
      length
    });
  });

  return episodes;
}

export default useEpisodes;