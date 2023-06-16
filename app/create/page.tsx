"use client";

import { useState } from "react";
import Form from "./components/Form";

import { Button } from "@/app/components";

import { useRouter } from "next/navigation";
import { LinkDTO } from "@/interfaces";

const metadata = {
  title: "iAdopt - Genera tu chatbot",
  description: `Herramienta para generar un chatbot inteligente de adopción animal a través de un enlace único.`,
};

const CreatePage = () => {
  const [link, setLink] = useState<LinkDTO | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const router = useRouter();

  const copyUrl = () => {
    if (!link) return;
    navigator.clipboard.writeText(link.url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <section className="py-5">
        {!link ? (
          <>
            <h3 className="primary-gradient pb-5 text-center text-xl lg:text-4xl font-semibold">
              ¿Cómo funciona?
            </h3>
            <Form onSubmit={(link: LinkDTO) => setLink(link)} />
          </>
        ) : (
          <div className="flex flex-col items-center gap-20">
            <div className="flex gap-5">
              <h3 className="primary-gradient text-xl lg:text-4xl font-semibold">
                ¡Listo! Has generado correctamente tu enlace:
              </h3>
              <Button
                variant={isCopied ? "success" : "primary"}
                onClick={copyUrl}
              >
                {isCopied ? "¡Copiado!" : "Copiar"}
              </Button>
            </div>

            <Button
              variant="secondary"
              onClick={() => {
                router.back(), setLink(null);
              }}
            >
              Regresar
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default CreatePage;
