import {
  CalendarIcon,
  FileTextIcon,
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
} from "lucide-react";
import MainHeader from "./_components/TodaySportHeader";
import TodaySportSection from "./_sections/TodaySportSection";
import BottomNavigationBar from "./_components/BottomNavigationBar";
import Calendar from "./_components/Calendar";

export default function MainPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white gap-5">
      <div className="flex-1 flex flex-col w-full h-max overflow-y-auto gap-y-6">
        <TodaySportSection />
        <div className="border-t mx-6 border-[#d4d6dd]" />
        <Calendar />
      </div>
      <BottomNavigationBar />
    </main>
  );
}
