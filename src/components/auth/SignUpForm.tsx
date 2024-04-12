"use client";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { crearCuenta } from "@/lib/db/methods/dbUser";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const SignUpForm = () => {

  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const directionRef = useRef<HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailRef.current || !nameRef.current || !directionRef.current || !passwordRef.current || !confirmPasswordRef.current) return;

    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const direction = directionRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const body = {
      email,
      name,
      direction,
      password,
      confirmPassword,
    }

    setIsLoading(true);
    const res = await crearCuenta(body);
    setIsLoading(false);

    res.message.map((msg) => toast(msg));
  };

  return (
    <div className="flex-1 bg-white rounded-sm max-w-[550px]">
      <form className="flex flex-col gap-6 p-4 md:p-8" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center">
          Crear cuenta
        </h1>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="text"
            placeholder="John Doe"
            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            ref={nameRef}
            required
          />
          <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Nombre del equipo o empresa
          </label>
        </div>
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
          <div>
            <input
              type="password"
              minLength={8}
              placeholder="Clave"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              ref={passwordRef}
              required
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="absolute left-12 -top-2.5 rounded-full bg-black text-white w-4 h-4">i</TooltipTrigger>
                <TooltipContent>
                  <p>La contraseña debe tener al menos 8 caracteres, una mayúscula,<br />una minúscula, un número y un caracter especial.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Clave
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="password"
            minLength={8}
            placeholder="Confirmar clave"
            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            ref={confirmPasswordRef}
            required
          />
          <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Confirmar clave
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <textarea
            placeholder="Silent St."
            rows={2}
            className="resize-none w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            ref={directionRef}
            required
          />
          <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Dirección
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <Button type="submit" className="mt-2 bg-sky-500 hover:bg-sky-600 shadow-md w-full" disabled={isLoading}>Empezar</Button>
        </div>
        <hr />
        <div className="relative gap-x-2 h-11 w-full min-w-[200px]">
          <Link href="/sign-in" className="w-full flex text-center content-center bg-black h-10 items-center justify-center rounded-md text-neutral-50 shadow transition-colors"
          >Ya tengo una cuenta</Link>
          <Button type="button" className="w-full block mt-4 h-10 bg-red-600 hover:bg-red-700 items-center justify-center rounded-md text-neutral-50 shadow transition-colors"
            onClick={() => signIn("google", { callbackUrl: "/management" })}
          >Entrar con Google</Button>
        </div>
      </form>
    </div>
  )
};
