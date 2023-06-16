"use client";

import React from "react";
import { Button } from "./components";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <section className="h-screen w-full text-center overflow-hidden flex flex-col gap-20 justify-center items-center">
      <h2 className="text-4xl xl:text-6xl flex flex-col gap-5 justify-center items-center">
        <span className=" text-[100px] xl:text-[200px] font-bold text-primary">
          404 |
        </span>{" "}
        <div className="flex gap-5 items-center">
          <span className="primary-gradient py-5">Página no encontrada</span> 😅
        </div>
      </h2>
      <h3 className="text-2xl">
        Lo siento, el recurso al que intentas acceder no existe
      </h3>
      <Button variant="primary" onClick={() => router.back()}>
        Volver
      </Button>
    </section>
  );
};

export default NotFound;
