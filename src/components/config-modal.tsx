import { useState } from 'react';
import useOptionsStore from '../stores/optionsStore';

export function ConfigModal() {
  const [isOpen, setIsOpen] = useState(false);
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
        className="rounded-full bg-white px-4 py-2 text-black shadow-lg focus-visible:outline focus-visible:outline-2"
        aria-expanded={isOpen}
        aria-controls="episode-settings"
        onClick={() => setIsOpen((open) => !open)}
      >
        Settings
      </button>
    </div>
  );
}