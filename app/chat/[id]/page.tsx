"use client";

import { Suspense, useEffect, useState } from "react";
import { ChatBot, InformationCard } from "./components";

import axios from "axios";
import { AdopterData } from "@/interfaces";

const ChatPage = ({ params }: { params: { id: string } }) => {
  const [isStarted, setIsStarted] = useState(false);

  const [adopterData, setAdopterData] = useState({} as AdopterData); // [key: string]: string
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onStart = async (values: Record<string, string>) => {
    // Check if the user has already done the interview
    const { data } = await axios.get(`/api/link/${params.id}`);
    setAdopterData(values as AdopterData);
    setDescription(data.description);
    setIsSubmitted(data.isSubmitted);

    // Update the document to set isSubmitted = true
    if (!isSubmitted) {
      await axios.patch(`/api/link/${params.id}`);
      setIsStarted(true);
    }
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      {isSubmitted ? (
        <section>
          <article className="text-center flex flex-col gap-5">
            <h2 className="text-5xl primary-gradient font-bold">
              ¡Ups! Parece que ya has realizado esta entrevista.
            </h2>
            <div className="flex flex-col gap-2.5 font-light">
              <h3 className="text-xl">
                Si crees que se trata de un error, ponte en contacto con la
                protectora para que soliciten un nuevo enlace.
              </h3>
              <h3 className="text-xl">
                En caso contrario, simplemente espera a que te contactemos 😊
              </h3>
            </div>
          </article>
        </section>
      ) : isStarted ? (
        <Suspense fallback={null}>
          <ChatBot
            animalDescription={description}
            adopterData={adopterData}
            id={params.id}
          />
        </Suspense>
      ) : (
        <InformationCard onStart={onStart} />
      )}
    </section>
  );
};

export default ChatPage;
