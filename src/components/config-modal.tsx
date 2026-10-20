import useOptionsStore from '../stores/optionsStore';

interface ConfigModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ConfigModal({ isOpen, onToggle }: ConfigModalProps) {
  const shuffleEpisodes = useOptionsStore((state) => state.shuffleEpisodes);
  const showDates = useOptionsStore((state) => state.showDates);

  return (
    <div className="fixed bottom-5 right-5 z-40 font-sans text-sm">
      <fieldset
        id="episode-settings"
        hidden={!isOpen}
        className="mb-3 rounded-2xl border-0 bg-white p-5 text-left text-black shadow-lg"
      >
        <legend className="sr-only">Episode settings</legend>
        <label className="flex items-center gap-2 whitespace-nowrap">
          <input
            type="checkbox"
            onChange={(event) => useOptionsStore.setState({ shuffleEpisodes: event.target.checked })}
            checked={shuffleEpisodes}
          />
          Shuffle episodes
        </label>
        <label className="mt-3 flex items-center gap-2 whitespace-nowrap">
          <input
            type="checkbox"
            onChange={(event) => useOptionsStore.setState({ showDates: event.target.checked })}
            checked={showDates}
          />
          Show dates
        </label>
      </fieldset>
      <button
        type="button"
        className="sr-only focus:not-sr-only focus:fixed focus:bottom-5 focus:right-5 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg focus-visible:outline focus-visible:outline-2"
        aria-expanded={isOpen}
        aria-controls="episode-settings"
        onClick={onToggle}
      >
        Settings
      </button>
    </div>
  );
}