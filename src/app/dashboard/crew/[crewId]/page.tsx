import { useRouter } from "next/navigation";
import CrewSection from "../_sections/CrewSection";
import RightBar from "../../_components/RightBar";

export default async function CrewPage({
  params,
}: {
  params: { crewId: string };
}) {
  const { crewId } = await params; // 비동기 처리
  return (
    <main className="w-full flex flex-row h-screen overflow-hidden">
      <CrewSection crewId={crewId} />
      <RightBar />
    </main>
  );
}
