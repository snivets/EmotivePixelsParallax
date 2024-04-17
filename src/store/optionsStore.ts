import { create } from 'zustand'

const useOptionsStore = create(() => ({
  shuffleEpisodes: false,
  showDates: false,
}));

export default useOptionsStore;