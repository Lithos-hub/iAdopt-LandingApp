import { FC } from "react";

import { Button } from "@/app/components";

import { Formik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { LinkDTO } from "@/interfaces";

interface Props {
  onSubmit: (link: LinkDTO) => void;
}

const Form: FC<Props> = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Introduce un correo electrónico válido")
      .required("Introduce un correo electrónico"),
    description: Yup.string().required("Introduce una descripción"),
  });

  return (
    <Formik
      initialValues={{ email: "", description: "" }}
      onSubmit={async (values) => {
        try {
          const { data } = (await axios.post("/api/link", values)) as {
            data: LinkDTO;
          };
          // const { data } = await axios.get("/api/link");
          onSubmit(data);
        } catch (error: unknown) {
          throw new Error(error as string);
        }
      }}
      validationSchema={validationSchema}
    >
      {({ values, errors, handleSubmit, getFieldProps, isSubmitting }) => (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-5"
        >
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-5">
            <div className="card-wrapper flex flex-col gap-10 text-center">
              <div>
                <h3 className="font-bold text-xl lg:text-3xl text-primary">
                  Paso #1
                </h3>
                <h5 className="font-bold text-base lg:text-2xl primary-gradient">
                  Escribe tu correo electrónico
                </h5>
              </div>
              <div className="flex flex-col gap-2.5">
                <p className="text-xs lg:text-base">
                  Una vez que el adoptante haya completado el proceso, te
                  enviaremos la valoración a la dirección que indiques a
                  continuación. Si no lo ves, ¡recuerda revisar tu buzón de
                  spam!
                </p>
                <input
                  id="email-input"
                  type="email"
                  {...getFieldProps(values.email)}
                  name="email"
                  value={values.email}
                  placeholder="ejemplo@ejemplo.com"
                  className="text-sm w-full border-2 border-slate-500/20 bg-[#05050560] backdrop-blur rounded-xl p-2 focus:outline z-50"
                />
                {errors.email && (
                  <small className="text-red-500 text-sm">{errors.email}</small>
                )}
              </div>
            </div>
            <div className="card-wrapper flex flex-col justify-between h-full gap-10 text-center">
              <div>
                <h3 className="font-bold text-xl lg:text-3xl text-primary">
                  Paso #2
                </h3>
                <h5 className="font-bold text-base lg:text-2xl primary-gradient">
                  Describe al animal
                </h5>
              </div>
              <div className="flex flex-col gap-2.5">
                <p className="text-xs lg:text-base">
                  Escribe una descripción del animal en adopción y cualquier
                  otra información que consideres relevante. Cuanta más
                  información proporciones, más preciso será el proceso.
                </p>
                <textarea
                  id="description-input"
                  {...getFieldProps(values.description)}
                  name="description"
                  value={values.description}
                  className="text-sm w-full border-2 bg-[#05050560] backdrop-blur text-justify border-slate-500/20 rounded-xl p-2 h-[140px] focus:outline resize-none z-50"
                  placeholder="Ejemplo: Se trata de un perro de raza mestiza, reside en Zamora y se llama Max y tiene 8 años de edad. Fue abandonado y tiene mucho miedo a las personas. La persona que lo adopte debe tener esto en cuenta ya que necesita un tiempo de adaptación, mucho tiempo y paciencia. Max está vacunado y esterilizado. Se entrega con contrato de pre-adopción de un año y seguimiento durante ese tiempo donde el adoptante se compromete a ponerle todas las vacunas, desparasitaciones y revisiones veterinarias que necesite."
                />
                {errors.description && (
                  <small className="text-red-500 text-sm">
                    {errors.description}
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="card-wrapper flex flex-col justify-between h-full w-full gap-10 text-center">
            <div>
              <h3 className="font-bold text-xl lg:text-3xl text-primary">
                ¿Todo listo?
              </h3>
              <h5 className="font-bold text-base lg:text-2xl primary-gradient">
                Pulsa en enviar
              </h5>
            </div>
            <p className="text-xs lg:text-base">
              Generaremos un enlace que podrás mandar al adoptante para que
              pueda realizar la entrevista de adopción.
            </p>

            {isSubmitting ? (
              <Button variant="disabled" className="mx-auto">
                <div className="flex gap-5 items-center justify-center">
                  <h5 className="primary-gradient">Generando...</h5>
                  <div
                    className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-solid border-secondary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
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
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
