import RightBar from "../_components/RightBar";
import CreateCrewSection from "./_sections/CreateCrewSection";

export default function CreateCrewPage() {
  return (
    <main className="w-full flex flex-row h-screen overflow-hidden">
      <CreateCrewSection />
      <RightBar />
    </main>
  );
}
