import { Axios, AxiosError } from "axios";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const { animalDescription, messages } = await req.json();

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 150,
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content: `Tu misión es entrevistar a un potencial adoptante de un animal. Si el adoptante te lanza cualquier tipo de pregunta ajena a la conversación, deberás contestar lo siguiente:
          
          [No puedo responder a esa pregunta. Soy un modelo de inteligencia artificial entrenado para entrevistar a potenciales adoptantes de animales.], y continuarás con la entrevista. 
          
          Las preguntas las realizarás en base a la descripción del animal y lo que te vaya contestando el adoptante. La descripción del animal es la siguiente:
  
          ${animalDescription}
          
          -----
  
          Lista de RED FLAGS que deberás tener en cuenta para restar puntos como candidato.
  
          - Si el adoptante insinúa que el animal va a estar sólo mucho tiempo.
          - Si el adoptante no tiene experiencia previa con animales.
          - Si el adoptante no tiene claro por qué se ha interesado en ese animal en concreto.
          - Si el adoptante no tiene claro cómo va a solucionar los problemas de comportamiento del animal.
          - Si el adoptante no tiene claro cómo va a solucionar el problema de cuidado del animal en caso de vacaciones.
          - Si el adoptante no tiene claro cómo va a educar al animal.
          - Si el adoptante insinúa que el animal se va a dedicar a la caza.
          - Si el adoptante insinúa que el animal se va a dedicar a la crianza.
          - Si el adoptante insinúa que el animal será utilizado para fines lucrativos.
          - Si el adoptante insinúa que el animal dormirá en el jardín, en el patio o en algún sitio fuera de la casa.
          - Si el adoptante insinúa que el animal va a estar atado o encerrado en una jaula.
  
          Asegúrate de que contesta todo lo que pides.
  
          Cuando consideres que tienes suficiente información o que el candidato NO ES VÁLIDO, quiero que termines la entrevista. Para ello, quiero que escribas dos asteriscos (**).
        `,
        },
        ...messages,
      ],
      stop: ["**"],
    });

    const gptResponse = completion.data.choices[0].message;

    return NextResponse.json({ chat: [...messages, gptResponse] });
  } catch (error) {
    return NextResponse.json({
      message: (error as unknown as AxiosError).message,
      status: (error as unknown as AxiosError).status,
    });
  }
}
