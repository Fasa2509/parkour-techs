"use client";

import LoginForm from "@/components/auth/LoginForm";
import { signIn } from "next-auth/react";

const Page = () => {
  return (
    // <main className="bg-popover max-w-lg mx-auto my-4 rounded-lg p-10">
    <main className="bg-popover my-4 mx-8 p-6 flex gap-x-8">
      <section className="flex-1 hidden md:block">
        <h1 className="from-neutral-700 text-4xl font-bold">
          Parkour Techs, manejo y control de equipos
        </h1>
        <p className="from-neutral-500 text-xl mt-4">Maneja todo tu equipo o empresa desde un solo sitio, a un solo click {";)"}</p>
      </section>
      <LoginForm />
    </main>
  );
};

export default Page;
