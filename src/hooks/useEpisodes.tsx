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
    
    if (!title || !desc) return;

    if (desc.startsWith('<p>')) {
      desc = desc.substring(3, desc.length - 5);
    }

    episodes.push({
      title,
      description: desc,
      imageUrl,
    });
  });

  return episodes;
}

export default useEpisodes;