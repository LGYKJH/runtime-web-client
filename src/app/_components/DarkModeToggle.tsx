"use client";

import { Button } from "@/components/ui/button";
import { useThemeStore } from "../_stores/themeStore";

import SunIcon from "/public/icons/icon-sun.svg";
import SunIconDark from "/public/icons/icon-sun-dark.svg";

export default function DarkModeToggle() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  return (
    <Button
      onClick={toggleDarkMode}
      variant="ghost"
      size="icon"
      className="w-7 h-7 px-0 py-0 gap-0"
    >
      {isDarkMode ? <SunIconDark width={20} height={20} /> : <SunIcon width={20} height={20} />}
    </Button>
  );
}
