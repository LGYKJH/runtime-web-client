import React from "react";

const AuthFormHeader = () => {
  return (
    <div className="flex flex-col gap-y-2 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">It's Runtime!</h1>
      <p className="text-sm text-muted-foreground">
        오늘 하루도 열심히 달려볼까요?
      </p>
    </div>
  );
};

export default AuthFormHeader;
