// stores/filterStore.ts
import { create } from "zustand";

type FilterState = {
  selectedDays: string[]; // 선택된 요일들
  selectedSports: string[]; // 선택된 스포츠들
  selectedCrewSize: string | null; // 선택된 크루 사이즈
  selectedDistrict: string | null; // 선택된 장소
  toggleDay: (day: string) => void; // 요일 토글 함수
  toggleSport: (sport: string) => void; // 스포츠 토글 함수
  setCrewSize: (size: string | null) => void; // 크루 사이즈 설정 함수
  setDistrict: (district: string | null) => void; // 장소 설정 함수
  resetDays: () => void; // 요일 초기화 함수
  resetSports: () => void; // 스포츠 초기화 함수
  resetFilters: () => void; // 전체 필터 초기화 함수
};

export const useFilterStore = create<FilterState>((set) => ({
  selectedDays: [],
  selectedSports: [],
  selectedCrewSize: null,
  selectedDistrict: null,

  toggleDay: (day) =>
    set((state) => ({
      selectedDays: state.selectedDays.includes(day)
        ? state.selectedDays.filter((d) => d !== day) // 이미 선택된 요일 제거
        : [...state.selectedDays, day], // 새로운 요일 추가
    })),

  toggleSport: (sport) =>
    set((state) => ({
      selectedSports: state.selectedSports.includes(sport)
        ? state.selectedSports.filter((s) => s !== sport) // 이미 선택된 스포츠 제거
        : [...state.selectedSports, sport], // 새로운 스포츠 추가
    })),

  setCrewSize: (size) => set({ selectedCrewSize: size }),

  setDistrict: (district) => set({ selectedDistrict: district }),

  resetDays: () =>
    set(() => ({
      selectedDays: [], // 요일을 초기화
    })),

  resetSports: () =>
    set(() => ({
      selectedSports: [], // 스포츠를 초기화
    })),

  resetFilters: () =>
    set(() => ({
      selectedDays: [],
      selectedSports: [],
      selectedCrewSize: null,
      selectedDistrict: null,
    })),
}));
