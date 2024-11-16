import {
  CalendarIcon,
  FileTextIcon,
  HomeIcon,
  Plus,
  UserIcon,
} from "lucide-react";
import React from "react";

const BottomNavigationBar = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-white z-30">
      <div className="px-[30px] py-[10px] w-full flex flex-row justify-between items-center">
        <button className="flex flex-col items-center text-gray-500">
          <HomeIcon className="h-6 w-6" />
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <CalendarIcon className="h-6 w-6" />
        </button>
        <button className="flex flex-col items-center">
          <div className="rounded-[14px] bg-[#006ffd] p-3 text-white shadow-lg">
            <Plus className="h-6 w-6" />
          </div>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <FileTextIcon className="h-6 w-6" />
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <UserIcon className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigationBar;
