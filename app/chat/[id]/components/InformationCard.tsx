import { Button } from "@/app/components";
import React, { FC } from "react";

interface Props {
  onStart: () => void;
}

const InformationCard: FC<Props> = ({ onStart }) => {
  return (
    <div className="w-[50vw] mx-auto p-10 bg-slate-900 rounded-[30px] flex flex-col gap-5 text-justify">
      <h2 className="text-3xl primary-gradient font-bold">
        Bienvenido a tu entrevista de adopción
      </h2>
      <div className="flex flex-col gap-2.5 font-light">
        <h3 className="text-xl">
          ¡Hola! Soy{" "}
          <strong className="font-extrabold primary-gradient">Lilu</strong>, una
          inteligencia artificial entrenada para ayudar a las protectoras de
          animales en los procesos de adopción. A continuación, te realizaré una
          serie de preguntas para determinar si eres apto para adoptar a ese
          animal que quieres que forme parte de tu vida.
        </h3>
        <h3 className="text-xl">
          Lee detenidamente el siguiente texto antes de comenzar. Cuando estes
          listo, pulsa en{" "}
          <strong className="font-extrabold primary-gradient">COMENZAR</strong>{" "}
        </h3>
        <hr className="opacity-20 my-5" />
      </div>
      <article>
        <ul className="flex flex-col gap-2.5 text-xl pl-5 font-light">
          <li className="list-disc">
            No almacenaremos ninguna información que proporciones, pero la
            protectora podrá ver la relación de preguntas y respuestas una vez
            finalizado el proceso.
          </li>
          <li className="list-disc">
            Contesta con sinceridad e intenta dar respuestas completas y
            detalladas. Puedes dar toda la información que consideres necesaria.
          </li>
          <li className="list-disc">
            Una vez pulses en{" "}
            <strong className="font-extrabold primary-gradient">
              COMENZAR
            </strong>
            , este enlace{" "}
            <span className="text-red-500">
              ya no será valido y no podrás volver a hacer la entrevista.
            </span>{" "}
            En caso de que ocurra algún error y necesites reiniciar el proceso,
            ponte en contacto con la protectora para que soliciten un nuevo
            enlace.
          </li>
        </ul>
      </article>
      <p className="text-center text-secondary">
        ¡Mucha suerte! Esperamos que pronto puedas disfrutar con tu nuevo
        compañero 🐶
      </p>
      <div className="flex justify-center">
        <Button variant="primary" onClick={onStart}>
          Comenzar
        </Button>
      </div>
    </div>
  );
};

export default InformationCard;
