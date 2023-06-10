import { Hero } from "@/app/components";
import Head from "next/head";

const metadata = {
  title: "iAdopt - Inteligencia Artificial para protectoras de animales",
  description: `Un chatbot es una herramienta que permite a los usuarios interactuar con un sistema mediante lenguaje natural. En este caso, usamos ChatGPT, un modelo de inteligencia artificial que genera respuestas a partir de un texto de entrada. iAdopt es una herramienta generadora de chatbots mediante inteligencia artificial para dar apoyo a las protectoras de animales de España en los procesos de adopción. Mediante un previo entrenamiento, el chatbot será capaz de realizar preguntas al adoptante directamente relacionadas con las circunstancias del animal en adopción.`,
  icons: {
    ico: "/favicon.ico",
  },
};

export default function HomePage() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.ico} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Hero />
    </>
  );
}
