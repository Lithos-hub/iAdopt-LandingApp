import "./globals.css";
import { Roboto } from "next/font/google";

import { Experience, Navbar } from "@/app/components";

const roboto = Roboto({
  variable: "--roboto-font",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <Navbar />
        <Experience />
        <main className="flex flex-col h-screen w-full xl:justify-center xl:items-center">
          <section className="flex flex-col gap-5 h-auto py-20 xl:py-0 w-[95vw] mx-auto xl:w-[80vw] xl:mt-0">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
