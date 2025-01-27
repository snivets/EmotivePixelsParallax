import { create } from 'zustand'

const useOptionsStore = create(() => ({
  shuffleEpisodes: false,
  showDates: true,
}));

export default useOptionsStore;