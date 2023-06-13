import React, { FC, useMemo, useState } from "react";
import { Button } from "@/app/components";
import { Formik } from "formik";

import * as Yup from "yup";

interface Props {
  onStart: (values: Record<string, string>) => void;
}

const InformationCard: FC<Props> = ({ onStart }) => {
  const [isStarting, setIsStarting] = useState(false);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email("Introduce un correo electrónico válido")
          .required("Introduce un correo electrónico"),
        fullname: Yup.string().required("Introduce tu nombre completo"),
      }),
    []
  );

  return (
    <div className="w-full pt-20 xl:pt-10 xl:w-[80vw] mx-auto p-10 bg-slate-900 xl:rounded-[30px] flex flex-col gap-5 text-justify h-full xl:h-auto xl:min-h-min max-h-screen overflow-y-auto">
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
            Primero, facilítanos abajo tu email y nombre completo para que la
            protectora pueda identificarte.
          </li>
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

      <Formik
        onSubmit={(values) => {
          setIsStarting(true);
          onStart(values);
        }}
        validateOnMount
        initialValues={{ email: "", fullname: "" }}
        validationSchema={validationSchema}
      >
        {({ values, errors, handleSubmit, isValid, getFieldProps }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-5 w-full"
          >
            <div className="flex justify-center gap-5">
              <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-col gap-2.5">
                  <input
                    type="email"
                    {...getFieldProps(values.email)}
                    name="email"
                    value={values.email}
                    placeholder="ejemplo@ejemplo.com"
                    className="text-sm w-full border-2 border-slate-500/20 bg-[#05050560] backdrop-blur rounded-xl p-2 focus:outline z-50"
                  />
                  {errors.email && (
                    <small className="text-red-500 text-sm">
                      {errors.email}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-col gap-2.5">
                  <input
                    {...getFieldProps(values.fullname)}
                    name="fullname"
                    value={values.fullname}
                    placeholder="Escribe tu nombre completo"
                    className="text-sm w-full border-2 border-slate-500/20 bg-[#05050560] backdrop-blur rounded-xl p-2 focus:outline z-50"
                  />
                  {errors.fullname && (
                    <small className="text-red-500 text-sm">
                      {errors.fullname}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div>
              <hr className="opacity-20 my-5" />

              <p className="text-center text-secondary">
                ¡Mucha suerte! Esperamos que pronto puedas disfrutar con tu
                nuevo compañero 🐶
              </p>
              <div className="flex justify-center">
                <Button
                  variant={isStarting || !isValid ? "disabled" : "primary"}
                  disabled={isStarting || !isValid}
                  type="submit"
                >
                  Comenzar
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default InformationCard;
