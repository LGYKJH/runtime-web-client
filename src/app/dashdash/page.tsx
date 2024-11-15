export default function HomePage() {
  const exercises = [
    {
      id: 1,
      title: "Jump Up 필운동편",
      instructor: "나이도 쉬움",
      rating: 5.0,
      image: "/placeholder.svg?height=200&width=300",
      likes: 3,
    },
    {
      id: 2,
      title: "Jump up",
      instructor: "나이도 쉬움",
      rating: 5.0,
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <main>
      <section className="flex min-h-screen flex-col bg-white">
        {/* Header */}
        <header className="flex items-center justify-between border-b p-4">
          <h1 className="text-lg font-medium">오늘의 운동</h1>
          <button className="text-primary">더보기</button>
        </header>
      </section>
    </main>
  );
}
