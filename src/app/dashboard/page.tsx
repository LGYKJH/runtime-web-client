import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "./_components/Header";
import LeftBar from "./_components/LeftBar";
import RightBar from "./_components/RightBar";
import MainSection from "./_sections/MainSection";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <LeftBar />
      <main className="w-full min-h-screen flex flex-row">
        <MainSection />
        <RightBar />
      </main>
    </SidebarProvider>
  );
}
