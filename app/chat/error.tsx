"use client";

import React from "react";
import { Button } from "@/app/components";

const ErrorRoot = () => {
  return (
    <section className="h-screen w-screen text-center flex flex-col justify-center items-center">
      <h2 className="w-full text-6xl">¡Ups! Algo salió mal 😓</h2>
      <h3 className="w-full text-4xl">
        Por favor, ponte en contacto con la protectora para que te faciliten
        otro enlace y vuelve a intentarlo más tarde. Sentimos las molestias.
      </h3>

      <Button variant="primary" onClick={() => window.location.reload()}>
        Recargar
      </Button>
    </section>
  );
};

export default ErrorRoot;
