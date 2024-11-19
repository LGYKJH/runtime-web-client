import RightBar from "./_components/RightBar";
import MainSection from "./_sections/MainSection";

export default function DashboardPage() {
  return (
    <main className="w-full flex flex-row h-screen overflow-hidden">
      <MainSection />
      <RightBar />
    </main>
  );
}
