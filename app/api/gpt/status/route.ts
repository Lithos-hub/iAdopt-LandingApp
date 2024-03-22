import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function GET() {
  try {
    await openai.createChatCompletion({
      model: "gpt-4",
      max_tokens: 10,
      temperature: 0.5,
      messages: [
        {
          role: "user",
          content:
            "Esto es un mensaje de prueba para comprobar tu funcionamiento.",
        },
      ],
      stop: ["**"],
    });

    return NextResponse.json({ isReady: true });
  } catch (error) {
    return NextResponse.json({
      isReady: false,
    });
  }
}
