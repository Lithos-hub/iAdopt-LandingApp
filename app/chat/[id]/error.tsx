"use client";

const ErrorChat = () => {
  return (
    <section className="h-screen w-screen text-center flex flex-col justify-center items-center">
      <h2 className="w-full text-6xl">
        ¡Ups! Parece que ChatGPT dejó de funcionar correctamente.
      </h2>
      <h3 className="w-full text-4xl">
        Por favor, solicita un nuevo enlace a la protectora y vuelve a
        intentarlo más tarde.
      </h3>
    </section>
  );
};

export default ErrorChat;
