"use client"
import { FormEvent, useRef } from "react";
import { signIn } from "next-auth/react";
import { checkSignIn } from "@/lib/db/methods/dbUser";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {

    const searchParams = useSearchParams();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!emailRef.current || !passwordRef.current) return;

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const checked = await checkSignIn({ email, password });

        const page = searchParams.get("p");
        const callbackUrl = (page && page.startsWith('/')) ? page : '/';
        console.log({ checked })

        setTimeout(() => signIn("credentials", { email, password, callbackUrl }), 5000)
    };

    return (
        <div className="flex-1">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-center">
                    Iniciar sesión
                </h1>
                <div className="relative h-11 w-full min-w-[200px]">
                    <input
                        type="email"
                        placeholder="Correo"
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
                    <input type="submit" placeholder="Clave" className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
                </div>
            </form>
        </div>
    )
};

export default LoginForm;


{/* <form className="px-4 card">
                <h1 className="text-2xl font-bold text-center">
                    Sign in to your account
                </h1>
                <div className="mt-4">
                    <button
                        onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
                        className="w-full bg-primary text-primary-foreground text-center hover:opacity-90 font-medium px-4 py-2 rounded-lg block"
                    >
                        Sign In
                    </button>
                </div>
            </form> */}