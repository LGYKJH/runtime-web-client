"use client";

import Spinner from "./_components/Spinner";

export default function LoadingPage() {
  return (
    <div className="w-full flex flex-col">
      <Spinner />
    </div>
  );
}
