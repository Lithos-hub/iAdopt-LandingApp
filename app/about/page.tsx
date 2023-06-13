"use client";

import { useMemo } from "react";

import { Button, Icon } from "@/app/components";
import TextHtml from "./components/TextHtml";
import { useRouter } from "next/navigation";
import Head from "next/head";

const metadata = {
  title: "iAdopt - Acerca de nosotros",
  description: `Proporcionamos una manera de agilizar los procesos de adopción de animales mediante el uso de inteligencia artificial de forma totalmente gratuita.`,
  icons: {
    ico: "/favicon.ico",
  },
};

const AboutPage = () => {
  const router = useRouter();

  const data = useMemo(
    () => [
      {
        title: "¿Qué hacemos?",
        description: [
          `Proporcionamos una manera de <strong>agilizar</strong> los procesos de adopción de animales mediante el uso de <strong class="primary-gradient">inteligencia artificial</strong> de forma <strong class="primary-gradient">totalmente gratuita</strong>.`,
        ],
        icons: ["fast"],
      },
      {
        title: "¿Cómo lo hacemos?",
        description: [
          `Primero, entrenamos a nuestro modelo de <strong class="primary-gradient">ChatGPT</strong> con la descripción del animal para que la IA pueda realizar preguntas al adoptante directamente relacionadas a las circunstancias del animal.`,
          `Segundo, generamos un <strong class="primary-gradient">chatbot</strong> con el modelo entrenado, el cual será accesible a través de un <strong class="primary-gradient">enlace único</strong>.`,
          `Finalmente, deberás proporcionar ese enlace al adoptante para que pueda afrontar la <strong class="primary-gradient">entrevista de adopción</strong>. Una vez terminado el proceso, recibirás un correo electrónico con la valoración de la entrevista.`,
        ],
        icons: ["cog", "chat", "user"],
      },
      {
        title: "¿Por qué lo hacemos?",
        description: [
          `Creemos que la tecnología y la inteligencia artificial pueden
        ser un gran aliado para organizaciones como las protectoras de
        animales, ya que sabemos que los recursos y el tiempo
        son limitados. Con esta herramienta, esperamos que las <strong class="primary-gradient">adopciones
        sean más rápidas y eficientes</strong> y, por supuesto, que los animales encuentren <strong class="primary-gradient">el mejor hogar posible</strong>.`,
        ],
        icons: ["robot"],
      },
    ],
    []
  );

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>

      <h2 className="primary-gradient text-4xl text-center xl:text-7xl font-bold">
        iAdopt
      </h2>

      {data.map((item, index) => (
        <article
          key={index}
          className="flex flex-col xl:flex-row items-center justify-center gap-10"
        >
          <h3 className="text-2xl xl:text-3xl text-center xl:text-right font-bold text-primary xl:w-[25vw]">
            {item.title}
          </h3>
          <div className="card-wrapper w-rounded-full">
            <ul className="text-white flex flex-col gap-2">
              {item.icons.map((icon, index) => (
                <li className="flex gap-5 items-center" key={index}>
                  <Icon name={icon} className="w-10 h-10" />
                  <h4 className="text-white xl:text-lg text-justify xl:w-[50vw]">
                    <TextHtml html={item.description[index]} />
                  </h4>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
      <div className="mx-auto">
        <Button variant="primary" onClick={() => router.back()}>
          Volver
        </Button>
      </div>
    </>
  );
};

export default AboutPage;
