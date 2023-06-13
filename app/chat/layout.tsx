import Head from "next/head";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>iAdopt - Entrevista de adopción</title>
        <meta name="description" content="Chat" />
      </Head>
      <div className="z-50 bg-gradient-to-br from-black to-slate-900 fixed top-0 left-0 h-screen w-screen">
        {children}
      </div>
    </>
  );
};

export default Layout;
