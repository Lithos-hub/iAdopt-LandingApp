"use client";

import { Suspense, useEffect, useState } from "react";
import { ChatBot, InformationCard } from "./components";

import axios from "axios";

const ChatPage = ({ params }: { params: { id: string } }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [description, setDescription] = useState("");
  const [isAlreadyDone, setIsAlreadyDone] = useState(false);

  useEffect(() => {
    const getAnimalDescription = async () => {
      const { data } = await axios.get(`/api/link/${params.id}`);
      console.log(data);
      setDescription(data.description);
      setIsAlreadyDone(data.isSubmitted);
    };
    getAnimalDescription();
  });

  useEffect(() => {
    // If the user has already done the interview, we don't want to update the document
    if (isAlreadyDone) return;

    const updateDocument = async () => {
      await axios.patch(`/api/link/${params.id}`);
    };
    updateDocument();
  }, [isAlreadyDone, params.id]);

  return (
    <section className="flex flex-col justify-center items-center">
      {isAlreadyDone ? (
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
          <ChatBot animalDescription={description} id={params.id} />
        </Suspense>
      ) : (
        <InformationCard onStart={() => setIsStarted(true)} />
      )}
    </section>
  );
};

export default ChatPage;
