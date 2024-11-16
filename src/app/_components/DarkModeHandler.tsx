"use client";

import { useEffect } from "react";
import { useThemeStore } from "../_stores/themeStore";

export default function DarkModeHandler() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return null; // UI를 렌더링하지 않음
}
