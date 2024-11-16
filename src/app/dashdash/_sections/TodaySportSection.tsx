import React from "react";
import TodaySportHeader from "../_components/TodaySportHeader";
import TodaySportCard from "../_components/TodaySportCard";

// TODO: 얘네는 그 뭐냐 API로 받는 걸로 바꿔야 함
const exercises = [
  {
    id: 1,
    title: "Jump Up 팔 운동편",
    difficulty: "난이도 보통",
    rating: 5.0,
    image: "https://placehold.co/257x182",
    likes: 3,
  },
  {
    id: 2,
    title: "Jump Up 가슴 운동편",
    difficulty: "난이도 쉬움",
    rating: 4.0,
    image: "https://placehold.co/257x182",
  },
  {
    id: 3,
    title: "Jump Up 등 운동편",
    difficulty: "난이도 어려움",
    rating: 5.0,
    image: "https://placehold.co/257x182",
  },
];

const TodaySportSection = () => {
  return (
    <section className="w-full flex flex-col pt-10 pl-6 pb-9 gap-4">
      <TodaySportHeader />
      <div className="overflow-x-scroll">
        <div className="w-max flex flex-row justify-start items-center gap-x-4 ">
          {exercises.map((exercise) => (
            <TodaySportCard
              key={exercise.id}
              id={exercise.id}
              title={exercise.title}
              image={exercise.image}
              likes={exercise.likes}
              difficulty={exercise.difficulty}
              rating={exercise.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TodaySportSection;
