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
//   {
//     role: "user",
//     content: "Mi nombre es Juan.",
//   },
//   {
//     role: "assistant",
//     content: "Hola Juan, un placer conocerte. ¿Cuál es tu edad?",
//   },
//   {
//     role: "user",
//     content: "Tengo 30 años.",
//   },
//   {
//     role: "assistant",
//     content:
//       "Cuéntame todo lo que puedas sobre tu situación actual general: trabajo, lugar de residencia, tipo de vivienda, si tienes hijos, etc.",
//   },
//   {
//     role: "user",
//     content:
//       "Soy un ingeniero de software que trabaja en una empresa de tecnología. Vivo con mi pareja en un piso en Valdemoro. No tengo hijos.",
//   },
//   {
//     role: "assistant",
//     content: "¡Interesante! ¿Trabajas en oficina, o en remoto desde casa?",
//   },
//   {
//     role: "user",
//     content: "Trabajo en remoto desde casa",
//   },
//   {
//     role: "assistant",
//     content:
//       "Por lo tanto, el animal apenas estaría solo la mayor parte del tiempo, ¿es correcto?",
//   },
//   {
//     role: "user",
//     content: "Efectivamente, estaría solo muy poco tiempo.",
//   },
//   {
//     role: "assistant",
//     content:
//       "Eso es genial. Es importante porque este animal es un cachorro de 4 meses, y va a necesitar mucha atención y cuidados.",
//   },
//   {
//     role: "assistant",
//     content: "¿Tienes experiencia previa con perros o gatos?",
//   },
//   {
//     role: "user",
//     content:
//       "Sí, en el pasado acogimos a un perro durante un par de meses. Mi pareja además siempre ha tenido perros en su familia.",
//   },
//   {
//     role: "assistant",
//     content:
//       "¿Por qué te has interesado concretamente en este cachorro de Border Collie?",
//   },
//   {
//     role: "user",
//     content:
//       "Porque es una raza muy inteligente y activa, y me gustaría tener un perro con el que poder hacer deporte y actividades al aire libre. Sé que exigen mucho ejercicio y atención, pero estoy dispuesto a ello. Vivimos además cerca del campo, por lo que sería perfecto para él.",
//   },
//   {
//     role: "assistant",
//     content:
//       "Suponiendo que tengáis que ir de vacaciones y no podáis llevaros al animal, ¿Cómo lo solucionaríais?",
//   },
//   {
//     role: "user",
//     content:
//       "Los padres de mi pareja tienen 3 perros y nos los podrían cuidar sin problema.",
//   },
//   {
//     role: "assistant",
//     content: "Un cachorro de 4 meses es muy joven. ¿Cómo lo educaríais?",
//   },
//   {
//     role: "user",
//     content:
//       "En caso de problemas de comportamiento contrataríamos a un adiestrador profesional. Además, mi pareja tiene experiencia en educación canina. Por otro lado, buscaríamos información en internet y en libros sobre el tema.",
//   },
//   {
//     role: "assistant",
//     content:
//       "¡Estupendo! Creo que ya tengo toda la información necesaria que podamos realizar una valoración. Ojala puedas tener a este cachorrín contigo muy pronto. La protectora se pondrá en contacto contigo para darte la información ¡Mucha suerte y un saludo!",
//   },
// ];

export async function POST(req: Request) {
  const { animalDescription, messages } = await req.json();

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    max_tokens: 150,
    temperature: 0.5,
    messages: [
      {
        role: "system",
        content: `Tu misión es entrevistar a un potencial adoptante de un animal. Si el adoptante te lanza cualquier tipo de pregunta ajena a la conversación, deberás contestar lo siguiente:
        
        'Lo siento, no puedo responder a esa pregunta. Soy un modelo de inteligencia artificial entrenado para entrevistar a potenciales adoptantes de animales.'. Y continuarás con la entrevista. Las preguntas las realizarás en base a la descripción del animal y lo que te vaya contestando el adoptante. La descripción del animal es la siguiente:
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
      `,
      },
      {
        role: "system",
        content:
          "Cuando consideres que tienes suficiente información o que el candidato NO ES VÁLIDO, quiero que termines la entrevista. Para ello, quiero que escribas '**END**' en tu último mensaje.",
      },
      ...messages,
    ],
    stop: ["**END**"],
  });

  const gptResponse = completion.data.choices[0].message;

  return NextResponse.json({ chat: [...messages, gptResponse] });
}

// Description of a Border Collie of 4 months old
