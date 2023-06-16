"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import axios from "axios";
import { Formik } from "formik";

import { Icon } from "@/app/components";
import { AdopterData } from "@/interfaces";

interface Props {
  animalDescription: string;
  id: string;
  adopterData: AdopterData;
}

interface Chat {
  content: string;
  role: "assistant" | "user";
}

const ChatBot: FC<Props> = ({ animalDescription, id, adopterData }) => {
  const [chatIsOver, setChatIsOver] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const chatboxRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const [chat, setChat] = useState<Chat[]>([
    {
      role: "assistant",
      content:
        "Hola, soy Lilu 😊. Te acompañaré en esta entrevista para asegurarnos de que eres el mejor candidato para adoptar a este animal.",
    },
    {
      role: "assistant",
      content:
        "Primero, cuéntame un poco sobre ti. Dime tu nombre, edad, ciudad o provincia donde resides y a qué te dedicas.",
    },
  ]);

  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
    chatInputRef.current?.focus();

    if (chat) {
      const lastMessage = chat.at(-1);

      const isEnding =
        (chat.length > 5 &&
          lastMessage?.content.toLowerCase().includes("lo siento")) ||
        lastMessage?.content.toLowerCase().includes("**") ||
        lastMessage?.content.toLowerCase().includes("gracias") ||
        lastMessage?.content.toLowerCase().includes("suerte");

      if (isEnding) {
        setIsEnding(true);
      }
    }
  }, [chat]);

  useEffect(() => {
    if (!isEnding) return;

    const sendResults = async () => {
      const { data } = await axios.get(`/api/link/${id}`);
      const email = data.email;

      const formattedChat = chat
        ?.map((message) => {
          return `${
            message.role === "assistant" ? "Entrevistador" : `Adoptante`
          }: ${message.content}`;
        })
        .join("\n\n");

      const { data: valoration } = await axios.post("/api/gpt/valoration", {
        formattedChat,
      });

      await axios.post("/api/email", {
        adopterData,
        email,
        valoration,
        formattedChat,
      });

      setChatIsOver(true);
      setIsEnding(false);
    };

    sendResults();
  }, [adopterData, chat, id, isEnding]);

  return isEnding ? (
    <section>
      <article className="text-center flex flex-col gap-5">
        <h2 className="text-5xl primary-gradient font-bold">
          ¡Gracias por tu tiempo!
        </h2>
        <h3 className="text-primary text-2xl">
          Por favor, no cierres esta ventana. Estamos procesando toda la
          información, esto puede demorarse unos instantes.
        </h3>
        <div className="sticky mx-auto bottom-0 left-1/2 -translate-x-1/2">
          <div className="chat__bot-loader" />
        </div>
      </article>
    </section>
  ) : chatIsOver ? (
    <section>
      <article className="text-center flex flex-col gap-5">
        <div className="flex flex-col gap-2.5 font-light">
          <h2 className="text-5xl primary-gradient font-bold">
            ¡Ya hemos terminado la entrevista! Puedes cerrar esta ventana.
          </h2>
          <h3 className="text-xl">
            Revisaremos tus respuestas y nos pondremos en contacto contigo en
            cuanto sea posible para darte una respuesta. ¡Mucha suerte!
          </h3>
          <hr className="opacity-20 my-5" />
        </div>
      </article>
    </section>
  ) : (
    <motion.section
      initial={{
        opacity: 0,
        width: "0%",
        height: "0%",
      }}
      animate={{
        opacity: 1,
        width: "100%",
        height: "100%",
      }}
      transition={{
        duration: 1,
      }}
      className="bg-gradient-to-br from-primary to-purple-500 p-[2px] rounded-[30px] h-screen z-50"
    >
      <div className="bg-[#151515] rounded-[30px] flex flex-col justify-between h-full">
        <div
          ref={chatboxRef}
          id="chat-box"
          className="flex flex-col gap-2.5 h-full p-2.5 m-2.5 xl:m-5 xl:p-5 overflow-y-auto relative"
        >
          {chat &&
            chat.map((message, index) => (
              <div
                key={index}
                className={`w-auto flex flex-col gap-2.5 ${
                  message.role === "assistant" ? "items-start" : "items-end"
                }`}
              >
                <div className="flex flex-col gap-2.5">
                  <p
                    className={` ${
                      message.role === "assistant"
                        ? "chat__bot-message"
                        : "chat__user-message"
                    }`}
                  >
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          {isThinking && (
            <div className="sticky mx-auto bottom-0 left-1/2 -translate-x-1/2">
              <div className="chat__bot-loader" />
            </div>
          )}
        </div>
        <div
          id="chat-tools"
          className="bg-slate-900 p-2.5 xl:p-5 rounded-b-[30px]"
        >
          <Formik
            initialValues={{ answer: "" }}
            onSubmit={async (values) => {
              setIsSubmitting(true);
              setIsThinking(true);
              try {
                const messages: Chat[] = [
                  ...(chat as Chat[]),
                  { role: "user", content: values.answer },
                ];
                setChat(messages);

                values.answer = "";

                const { data } = await axios.post("/api/gpt/interview", {
                  animalDescription,
                  messages,
                });
                setChat(data.chat);
              } catch (error: unknown) {
                throw new Error(error as string);
              } finally {
                setIsThinking(false);
                setIsSubmitting(false);
              }
            }}
          >
            {({ values, handleSubmit, getFieldProps }) => (
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
                className="flex flex-col xl:flex-row items-center gap-2.5 xl:gap-5"
              >
                <textarea
                  ref={chatInputRef}
                  id="chat-input"
                  {...getFieldProps(values.answer)}
                  name="answer"
                  value={values.answer}
                  disabled={isThinking}
                  className="w-full border-2 bg-[#202020] text-justify border-slate-500/20 rounded-xl p-5 h-[140px] focus:outline resize-none z-50"
                  placeholder="Escribe aquí tu respuesta."
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !values.answer.length}
                  className={`rounded-full min-w-[60px] min-h-[60px] aspect-square flex justify-center items-center bg-[#202020] cursor-pointer duration-200 border-2 border-slate-500/20 p-2 px-3  ${
                    isSubmitting
                      ? "opacity-50"
                      : "hover:bg-green-500/10 hover:scale-110 active:bg-white/50"
                  }`}
                >
                  <Icon name="send" className="w-7 h-8" />
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </motion.section>
  );
};

export default ChatBot;
