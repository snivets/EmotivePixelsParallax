import useOptionsStore from "../store/optionsStore";

const ConfigModal = () => {
  const shuffleEpisodes = useOptionsStore((state) => state.shuffleEpisodes);
  const showDates = useOptionsStore((state) => state.showDates);

  const toggleShuffleEpisodes = (checked: boolean) => {
    useOptionsStore.setState({shuffleEpisodes: checked});
  }
  const toggleShowDates = (checked: boolean) => {
    useOptionsStore.setState({ showDates: checked });
  }

  return (
    <div className="fixed bottom-20 right-20 bg-opacity-75 transform bg-white border-opacity-100 rounded-2xl p-5 text-left text-xs font-sans italic drop-shadow"
        onClick={(e) => e.stopPropagation()} >
      <label className='flex items-top'>
        <input
          type="checkbox"
          onChange={(e) => toggleShuffleEpisodes(e.target.checked)}
          checked={shuffleEpisodes} />
        <span className='px-1'>Shuffle episodes</span>
      </label>
      <label className='flex items-top'>
        <input
          type="checkbox"
          onChange={(e) => toggleShowDates(e.target.checked)}
          checked={showDates} />
        <span className="px-1">Show dates</span>
      </label>
      <label className='flex items-top'>
        <input
          type="checkbox"
          disabled={true}
          checked={false} />
        <span className="px-1">Behind the scenes</span>
      </label>
    </div>
  )
}

export default ConfigModal;