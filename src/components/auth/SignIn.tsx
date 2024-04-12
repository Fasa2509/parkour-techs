"use client";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { checkSignIn } from "@/lib/db/methods/dbUser";
import { useSearchParams } from "next/navigation";
import { DOMAIN_NAME } from "@/lib/api/Api";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const SignInForm = () => {

  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailRef.current || !passwordRef.current) return;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    setIsLoading(true);
    const checked = await checkSignIn({ email, password });
    setIsLoading(false);

    const page = searchParams.get("p");
    const callbackUrl = (page && page.startsWith('/')) ? page : '/management';
    checked.error && checked.message.map((msg) => toast(msg));
    !checked.error && window.location.replace(DOMAIN_NAME + callbackUrl);
  };

  return (
    <div className="flex-1 bg-white rounded-sm max-w-[550px]">
      <form className="flex flex-col gap-6 p-4 md:p-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center">
          Iniciar sesión
        </h1>
        <span>Comienza a gestionar tu equipo ahora.</span>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="email"
            placeholder="correo@gmail.com"
            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            ref={emailRef}
            required
          />
          <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Correo de tu equipo o empresa
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="password"
            minLength={8}
            placeholder="Clave"
            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            ref={passwordRef}
            required
          />
          <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Clave
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <Button type="submit" className="bg-sky-500 hover:bg-sky-600 mt-2 shadow-md w-full" disabled={isLoading}>Ingresar</Button>
        </div>
        <hr />
        <div className="relative flex flex-col md:flex-row gap-x-2 h-11 w-full min-w-[200px]">
          <Link href="/sign-up" className="flex-1 w-full py-2 text-sm bg-black hover:bg-gray-800 inline-flex h-11 items-center justify-center rounded-md text-neutral-50 shadow transition-colors"
          >No tengo una cuenta</Link>
          <Button type="button" className="flex-1 mt-2 md:mt-0 py-2 text-sm w-full inline-flex bg-red-600 hover:bg-red-700 h-11 items-center justify-center rounded-md text-neutral-50 shadow transition-colors"
            onClick={() => signIn("google", { callbackUrl: "/management" })}
          >Entrar con Google</Button>
        </div>
      </form>
    </div>
  )
};
