import Form from "./components/Form";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-5">
      <h3 className="primary-gradient text-center lg:text-left text-xl lg:text-4xl font-semibold">
        ¿Cómo funciona?
      </h3>
      <Form />
    </section>
  );
}
