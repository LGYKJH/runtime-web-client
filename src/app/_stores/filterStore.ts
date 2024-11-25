// stores/filterStore.ts
import { create } from "zustand";

type FilterState = {
  selectedDays: string[];
  selectedSports: string[];
  selectedCrewSize: string | null;
  selectedDistrict: string | null;
  toggleDay: (day: string) => void;
  toggleSport: (sport: string) => void;
  setCrewSize: (size: string | null) => void;
  setDistrict: (district: string | null) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  selectedDays: [],
  selectedSports: [],
  selectedCrewSize: null,
  selectedDistrict: null,
  toggleDay: (day) =>
    set((state) => ({
      selectedDays: state.selectedDays.includes(day)
        ? state.selectedDays.filter((d) => d !== day)
        : [...state.selectedDays, day],
    })),
  toggleSport: (sport) =>
    set((state) => ({
      selectedSports: state.selectedSports.includes(sport)
        ? state.selectedSports.filter((s) => s !== sport)
        : [...state.selectedSports, sport],
    })),
  setCrewSize: (size) => set({ selectedCrewSize: size }),
  setDistrict: (district) => set({ selectedDistrict: district }),
}));
