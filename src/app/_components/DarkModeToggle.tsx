"use client";

import { useThemeStore } from "../_stores/themeStore";

export default function DarkModeToggle() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  return (
    <button
      onClick={toggleDarkMode}
      className="p-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
}
