"use client";

import React from "react";
import { Button } from "./components";

const ErrorRoot = () => {
  return (
    <section className="h-screen w-screen text-center flex flex-col justify-center items-center">
      <h2 className="w-full text-6xl">¡Ups! Algo salió mal 😓</h2>
      <h3 className="w-full text-4xl">
        Por favor, vuelve a intentarlo más tarde.
      </h3>

      <Button variant="primary" onClick={() => window.location.reload()}>
        Recargar
      </Button>
    </section>
  );
};

export default ErrorRoot;
