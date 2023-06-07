"use client";

import { useMemo } from "react";
import Link from "next/link";

import { Button, Icon } from "@/app/components";
import TextHtml from "./components/TextHtml";

const AboutPage = () => {
  const data = useMemo(
    () => [
      {
        title: "¿Qué hacemos?",
        description: [
          `Proporcionamos una manera de <strong>agilizar</strong> los procesos de adopción de animales mediante el uso de <strong>inteligencia artificial</strong> de forma totalmente gratuita.`,
        ],
        icons: ["fast"],
      },
      {
        title: "¿Cómo lo hacemos?",
        description: [
          `Primero, entrenamos a nuestro modelo de <strong>ChatGPT</strong> con la descripción del animal para que la IA pueda realizar preguntas al adoptante directamente relacionadas a las circunstancias del animal.`,
          `Segundo, generamos un <strong>chatbot</strong> con el modelo entrenado, el cual será accesible a través de un <strong>enlace único</strong>.`,
          `Finalmente, deberás proporcionar ese enlace al adoptante para que pueda afrontar la <strong>entrevista de adopción</strong>.`,
        ],
        icons: ["cog", "chat", "user"],
      },
      {
        title: "¿Por qué lo hacemos?",
        description: [
          `Creemos que la tecnología y la inteligencia artificial pueden
        ser un gran aliado para organizaciones como las protectoras de
        animales en España, ya que sabemos que los recursos y el tiempo
        son limitados. Con esta plataforma, esperamos que las adopciones
        sean más rápidas y eficientes.`,
        ],
        icons: ["robot"],
      },
    ],
    []
  );

  return (
    <section className="flex flex-col gap-10 py-10 xl:py-0 xl:justify-center xl:items-center">
      {data.map((item, index) => (
        <article
          key={index}
          className="flex flex-col xl:flex-row items-center justify-center gap-10"
        >
          <h2 className="text-2xl xl:text-3xl text-center xl:text-right font-bold text-primary xl:w-[25vw]">
            {item.title}
          </h2>
          <div className="card-wrapper w-rounded-full">
            <ul className="text-white flex flex-col gap-2">
              {item.icons.map((icon, index) => (
                <li className="flex gap-5 items-center" key={index}>
                  <Icon name={icon} className="w-10 h-10" />
                  <h3 className="text-white xl:text-lg text-justify lg:w-[50vw]">
                    <TextHtml html={item.description[index]} />
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
      <div className="mx-auto">
        <Link href="/">
          <Button variant="primary">Volver</Button>
        </Link>
      </div>
    </section>
  );
};

export default AboutPage;
