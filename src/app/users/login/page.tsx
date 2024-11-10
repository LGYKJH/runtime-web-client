import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Runtime</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label className="hidden" htmlFor="email">
                  이메일
                </Label>
                <Input id="email" placeholder="이메일" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label className="hidden" htmlFor="password">
                  비밀번호
                </Label>
                <Input id="password" placeholder="비밀번호" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full">로그인</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
