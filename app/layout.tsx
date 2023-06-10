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
        <main className="flex flex-col w-full mx-auto py-[5vh] xl:max-w-[80vw] h-full xl:justify-center xl:items-center xl:py-0">
          {children}
        </main>
      </body>
    </html>
  );
}
