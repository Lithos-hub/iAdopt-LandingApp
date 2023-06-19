"use client";

import { Suspense, useEffect, useState } from "react";
import { ChatBot, InformationCard } from "./components";

import axios from "axios";
import { AdopterData } from "@/interfaces";

const ChatPage = ({ params }: { params: { id: string } }) => {
  const [GPTStatusError, setGPTStatusError] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [GPTIsReady, setGPTIsReady] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [adopterData, setAdopterData] = useState({} as AdopterData); // [key: string]: string
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [states, setStates] = useState({
    GPTStatusError: false,
    isStarted: false,
    GPTIsReady: false,
    isCheckingStatus: false,
    adopterData: {},
    description: "",
    isSubmitted: false,
  });

  const setState = (newState: Partial<typeof states>) => {
    setStates((prev) => ({ ...prev, ...newState }));
  };

  const onCheckGPTStatus = async (values: Record<string, string>) => {
    try {
      setIsCheckingStatus(true);
      const { data } = await axios.get("/api/gpt/status");
      setState({ GPTIsReady: data.isReady, GPTStatusError: !data.isReady });
      await onStart(values);
    } catch (error) {
      setState({ GPTStatusError: true });
      throw error;
    } finally {
      setState({ isCheckingStatus: false });
    }
  };

  const onStart = async (values: Record<string, string>) => {
    if (!GPTIsReady) return;

    // Check if the user has already done the interview
    const { data } = await axios.get(`/api/link/${params.id}`);

    setState({
      adopterData: values as AdopterData,
      description: data.description,
      isSubmitted: data.isSubmitted,
    });

    // Update the document to set isSubmitted = true
    if (!isSubmitted) {
      await axios.patch(`/api/link/${params.id}`);
      setState({ isStarted: true });
    }
  };

  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      {GPTStatusError ? (
        <section>
          <article className="text-center flex flex-col gap-5">
            <h2 className="text-5xl primary-gradient font-bold">
              El chatbot no se encuentra actualmente disponible.
            </h2>
            <h3 className="text-xl">
              Por favor, vuelve a intentarlo más tarde. Sentimos las molestias.
            </h3>
          </article>
        </section>
      ) : isSubmitted ? (
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
        <InformationCard
          onStart={onCheckGPTStatus}
          isStarting={isStarted}
          isCheckingStatus={isCheckingStatus}
        />
      )}
    </section>
  );
};

export default ChatPage;
