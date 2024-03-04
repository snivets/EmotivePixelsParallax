const getImages = () => {
  const images = import.meta.glob('/public/images/*');
  return Object.keys(images).map((path) => {
    const fileName = path.match(/\/public\/images\/(.+)\.\w+$/)?.[1]; //Filename only
    return fileName || '';
  });
};

function useImageFilter(allEpisodes: Episode[]): Episode[] {
  let images = getImages();
  let filteredEpisodes: Episode[] = [];
  allEpisodes.forEach(e => {
    if (e.seasonString && images.includes(e.seasonString)) {
      filteredEpisodes.push(e);
    }
  });

  return filteredEpisodes;
}

export default useImageFilter;