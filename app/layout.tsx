import "./globals.css";
import { Roboto } from "next/font/google";

import { Experience, Navbar } from "@/app/components";

const roboto = Roboto({
  variable: "--roboto-font",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const metadata = {
  title: "iAdopt - Inteligencia Artificial para protectoras de animales",
  description: `Un chatbot es una herramienta que permite a los usuarios interactuar con un sistema mediante lenguaje natural. En este caso, usamos ChatGPT, un modelo de inteligencia artificial que genera respuestas a partir de un texto de entrada. iAdopt es una herramienta generadora de chatbots mediante inteligencia artificial para dar apoyo a las protectoras de animales de España en los procesos de adopción. Mediante un previo entrenamiento, el chatbot será capaz de realizar preguntas al adoptante directamente relacionadas con las circunstancias del animal en adopción.`,
  icons: {
    ico: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.ico} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={roboto.className}>
        <Navbar />
        <Experience />
        <main className="flex flex-col h-screen w-full xl:justify-center xl:items-center">
          <section className="flex flex-col gap-5 h-auto py-20 xl:py-0 w-[95vw] mx-auto xl:w-[80vw] xl:mt-0">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
