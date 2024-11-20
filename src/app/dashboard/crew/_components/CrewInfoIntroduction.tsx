import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React from "react";

const text = `안녕하세요! 🏃‍♂️ 관악구 대표 러닝 크루에 오신 것을 환영합니다! 🏃‍♀️

이곳은 단순히 뛰기만 하는 곳이 아닙니다. 💪
바로, 심장 박동과 함께 추억을 쌓는 러닝 메카입니다! 🏞️

🔥 우리의 철학
“뛴다, 고로 나는 존재한다!” 이 한 문장으로 모든 것이 설명됩니다.
관악구의 맑은 공기를 가르며, 우리는 삶의 스트레스를 날려버립니다.
트레일 런과 리커버리 런이라는 특별한 조합으로, 달리고 난 뒤의 행복을 모두가 함께 느낍니다.

🗓️ 일정
매주 월요일, 우리가 모여 관악 근린공원을 달리는 날입니다!
트레일을 따라 힘차게 달리고, 끝난 후엔 가벼운 리커버리 런으로 피로를 풀어줍니다.
🚶‍♂️ 초보자도 환영!
🏃‍♀️ 베테랑 러너도 환영!

👫 현재 구성원
현재 크루는 8명, 정원은 20명!
남녀노소, 러닝 실력에 상관없이 누구든 이곳에서 환영받을 수 있습니다.
“내가 뛸 수 있을까?” 고민하지 마세요. 우리 모두는 처음에서 시작했으니까요!

🌲 러닝 코스와 분위기
관악 근린공원은 단순한 공원이 아닙니다.
서울의 자연과 러닝을 한꺼번에 만끽할 수 있는 천혜의 장소!
함께 뛰면서 도란도란 나누는 대화 속에서 웃음이 끊이지 않는 시간!
땀 한 방울마다 우리의 유대감이 단단해지는 것을 느낄 수 있습니다.

🧢 신입 러너들을 위한 특전
첫 참여자에게는 특별한 러닝 굿즈 증정! 🎁
러닝 후에는 간단한 스낵과 음료 제공! 🍹
선배 러너들과 함께하는 러닝 팁 공유 시간! 🤝

💬 크루장 감성 한 마디
“뛰는 놈 위에 나는 놈 없고, 뛰는 놈들 사이엔 관악 러닝 크루가 있다!”
여러분의 삶에 새로운 엔진을 달아줄 러닝 크루에 합류하세요.
땀 흘리며 웃고, 함께 성장하는 이 경험을 절대 놓치지 마세요! 🌟

관악구 대표 러닝 크루는 언제나 여러분을 기다립니다.
이제 신발 끈을 단단히 묶고, 우리의 크루에 발을 들여놓을 시간입니다!

🎉 달리는 발걸음, 우리가 만들어가는 이야기!
모두 함께 뛰어보아요~ 🏃‍♀️🏃‍♂️`;

interface CrewInfoIntroductionProps {
  crewGoal: string;
}

const CrewInfoIntroduction = ({ crewGoal }: CrewInfoIntroductionProps) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-y-6">
      <div className="w-full flex flex-col justify-items-start gap-y-2">
        <Label className="font-bold text-primary text-md">크루 소개</Label>
        <Separator className="bg-sidebar-border" />
      </div>
      <p className="whitespace-pre-wrap">{crewGoal}</p>
    </div>
  );
};

export default CrewInfoIntroduction;
