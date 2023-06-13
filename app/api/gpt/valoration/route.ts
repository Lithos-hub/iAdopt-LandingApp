import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const EXAMPLE_MESSAGES = [
//   {
//     role: "assistant",
//     content:
//       "Hola, soy Lilu. Te acompañaré en esta entrevista para evaluar si eres un buen candidato para adoptar a este animal.",
//   },
//   {
//     role: "assistant",
//     content: "Primero, cuéntame un poco sobre ti. ¿Cuál es tu nombre?",
//   },
// ];

export async function POST(req: Request) {
  const { formattedChat } = await req.json();

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 250,
    temperature: 0.5,
    messages: [
      {
        role: "system",
        content: `Tu misión será evaluar a un adoptante potencial para un perro o un gato a partir de una conversación que se te va a facilitar. El objetivo es evaluar si el adoptante es un buen candidato para adoptar al animal. Para ello, deberás evaluar la conversación y dar una valoración final. Analiza las respuestas del adoptante y evalúa si es un buen candidato para adoptar al animal en función de lo elaboradas que sean sus respuestas y del tipo de respuesta. Califícalo con una nota del 1 al 10, siendo 1 un candidato muy malo y 10 un candidato excelente.
      `,
      },
      {
        role: "user",
        content: formattedChat,
      },
    ],
  });

  const gptResponse = completion.data.choices[0].message;

  return NextResponse.json(gptResponse);
}

// Description of a Border Collie of 4 months old
