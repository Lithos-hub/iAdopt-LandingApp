import Head from "next/head";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>iAdopt - Entrevista de adopción</title>
        <meta name="description" content="Chat" />
      </Head>
      <div className="z-40 bg-gradient-to-br from-black to-slate-900 fixed top-0 left-0 flex flex-col justify-end pb-2.5 xl:pb-0 xl:justify-center items-center w-screen h-screen">
        {children}
      </div>
    </>
  );
};

export default Layout;
