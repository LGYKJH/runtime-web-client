import AuthFormHeader from "./_components/AuthFormHeader";
import UserAuthForm from "./_components/UserAuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:px-0">
      {/* 왼쪽 배경 섹션 */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-5 w-5"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          RUNTIME
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              “누가 먼저 도착했는지는 중요하지 않다. 중요한 건 누가 덜 힘들어
              보이느냐이다.”
            </p>
            <footer className="text-sm">– 이가영 –</footer>
          </blockquote>
        </div>
      </div>

      {/* 오른쪽 폼 섹션 */}
      <div className="w-full p-6 lg:p-8">
        <div className="w-full mx-auto flex flex-col justify-center items-center gap-y-6">
          <AuthFormHeader />
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
