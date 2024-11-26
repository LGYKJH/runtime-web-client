import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    // 클라이언트에서 받은 데이터 추출
    const { place, date, crewName, description } = await req.json();

    // OpenAI GPT 요청 생성
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a creative writer skilled at crafting fun, witty, engaging Korean-only and slightly cheesy (아재 감성) recruitment posts for running crews. Add a sprinkle of humor, emojis, and an engaging tone to the generated content.

**Rules to follow:**
1. Use emojis sparingly but effectively to make the text lively.
2. Include friendly humor with a dad-joke vibe (아재 감성).
3. Make the post sound welcoming and energetic.
4. Include the provided details (place, date, crew name, description) naturally in the text.
5. End with an encouraging call to action.`,
        },
        {
          role: "user",
          content: `Here are the details:
- Place: ${place}
- Date: ${date}
- Crew Name: ${crewName}
- Description: ${description}`,
        },
      ],
    });

    // OpenAI 응답 처리
    const generatedPost = response.choices[0]?.message?.content?.trim();

    return NextResponse.json({ post: generatedPost });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate recruitment post" },
      { status: 500 }
    );
  }
}
