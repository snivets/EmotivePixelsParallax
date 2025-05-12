const getSvgImages = () => {
  const images = import.meta.glob('/public/images/svgs/*.svg');
  return Object.keys(images).map((path) => {
    const fileName = path.match(/\/public\/images\/svgs\/(.+)\.svg$/)?.[1]; // Filename only
    return fileName || '';
  });
};

function useSplitS5Episodes(allEpisodes: Episode[]): Episode[] {
  let filteredEpisodes: Episode[] = [];
  const svgImages = getSvgImages();
  allEpisodes.forEach(e => {
    if (e.seasonNumber === 5 && e.episodeNumber !== 1) {
      e.hasLocalArt = e.seasonString !== null && svgImages.includes(e.seasonString);
      filteredEpisodes.push(e);
    }
  });

  return filteredEpisodes;
}

export default useSplitS5Episodes;