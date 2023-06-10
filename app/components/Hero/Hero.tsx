import Link from "next/link";
import { Button, Icon } from "@/app/components";

const Hero = () => {
  return (
    <section className="z-40 h-screen max-w-screen flex flex-col items-center justify-center gap-5">
      <h1 className="primary-gradient text-7xl lg:text-[200px] font-bold py-20">
        <span className="text-6xl lg:text-[150px]">i</span>Adopt
      </h1>
      <h2 className="text-2xl tracking-wide font-light text-center">
        Tu{" "}
        <span className="primary-gradient font-bold">
          asistente inteligente
        </span>{" "}
        para procesos de{" "}
        <span className="primary-gradient font-bold">adopción animal</span>
      </h2>
      <div className="flex gap-5">
        <Link href="/create">
          <Button variant="secondary">Comenzar</Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
