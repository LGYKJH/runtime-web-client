import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <div>
      <Link href="/users/login" passHref>
        <button className="w-full flex flex-row justify-center items-center">
          시작하기
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
