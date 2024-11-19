import CreateRightBar from "./_components/CreateRightBar";
import CreateCrewSection from "./_sections/CreateCrewSection";

export default function CreateCrewPage() {
  return (
    <main className="w-full flex flex-row h-screen overflow-hidden">
      <CreateCrewSection />
      <CreateRightBar />
    </main>
  );
}
