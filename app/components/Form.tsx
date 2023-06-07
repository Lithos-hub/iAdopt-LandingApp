"use client";

import { Button } from "@/app/components";

import { Formik } from "formik";
import * as Yup from "yup";

const Form = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Introduce un correo electrónico válido")
      .required("Introduce un correo electrónico"),
    description: Yup.string().required("Introduce una descripción"),
  });

  return (
    <Formik
      initialValues={{ email: "", description: "" }}
      onSubmit={() => {
        setTimeout(() => {
          console.log("Submitting...");
        }, 2000);
      }}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleSubmit, getFieldProps, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:grid lg:grid-cols-2 items-center gap-5"
        >
          <div className="card-wrapper w-full">
            <h4 className="font-bold text-xl lg:text-3xl primary-gradient flex justify-between items-end">
              <span>Paso #1</span>
              <span className="text-base lg:text-2xl">
                Escribe tu correo electrónico
              </span>
            </h4>
            <p className="text-xs lg:text-sm text-white">
              <br /> Una vez que el adoptante haya completado el proceso, te
              enviaremos la valoración.
            </p>
          </div>
          <div className="w-full">
            <input
              id="email-input"
              type="email"
              autoFocus
              {...getFieldProps(values.email)}
              name="email"
              value={values.email}
              placeholder="ejemplo@ejemplo.com"
              className="text-sm w-full border-2 text-white border-slate-500/20 bg-[#05050560] backdrop-blur rounded-xl p-2 focus:outline z-50"
            />
            {errors.email && (
              <small className="text-red-500 text-xs">{errors.email}</small>
            )}
          </div>
          <div className="card-wrapper">
            <h4 className="font-bold text-xl lg:text-3xl primary-gradient flex justify-between items-end">
              <span>Paso #2</span>
              <span className="text-base lg:text-2xl">Describe al animal</span>
            </h4>
            <p className="text-xs lg:text-sm text-white">
              Escribe una descripción del animal en adopción y cualquier otra
              información que consideres relevante. Cuanta más información
              proporciones, más preciso será el proceso.
            </p>
          </div>
          <div className="w-full">
            <textarea
              id="description-input"
              {...getFieldProps(values.description)}
              name="description"
              value={values.description}
              className="text-sm w-full border-2 bg-[#05050560] backdrop-blur text-justify text-white border-slate-500/20 rounded-xl p-2 h-40 lg:h-52 focus:outline resize-none z-50"
              placeholder="Ejemplo: El animal se encuentra en Zamora, es un perro de raza mestiza, se llama Max y tiene 8 años de edad. Fue abandonado y tiene mucho miedo a las personas, pero también es muy cariñoso cuando coge confianza y le encanta jugar con otros perros. La persona que lo adopte debe tener esto en cuenta ya que necesita un tiempo de adaptación, mucho tiempo y paciencia. Max está vacunado y esterilizado. Se entrega con contrato de pre-adopción de un año y seguimiento durante ese tiempo donde el adoptante se compromete a ponerle todas las vacunas, desparasitaciones y revisiones veterinarias que necesite."
            />
            {errors.description && (
              <small className="text-red-500 text-xs">
                {errors.description}
              </small>
            )}
          </div>

          <div className="card-wrapper w-full">
            <h4 className="font-bold text-xl lg:text-3xl primary-gradient flex justify-between items-end">
              <span> ¿Todo listo?</span>
              <span className="text-base lg:text-2xl">Pulsa en Enviar</span>
            </h4>
            <p className="text-xs lg:text-sm text-white">
              Generaremos un enlace que podrás mandar al adoptante para que
              pueda realizar la entrevista de adopción.
            </p>
          </div>
          {isSubmitting ? (
            <Button variant="disabled" className="mx-auto">
              <div className="flex gap-5 items-center justify-center">
                <span className="text-primary">Generando...</span>
                <div
                  className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                />
              </div>
            </Button>
          ) : (
            <Button
              type="submit"
              className="mx-auto"
              variant={
                errors.description ||
                errors.email ||
                !values.email.length ||
                !values.description.length
                  ? "disabled"
                  : "primary"
              }
            >
              Enviar
            </Button>
          )}
        </form>
      )}
    </Formik>
  );
};

export default Form;
