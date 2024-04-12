import { FC } from "react";
import Link from "next/link"
import { Session } from "next-auth";

import { Button } from "./ui/button"

interface Props {
    session: Session | null;
}

export const MainSection: FC<Props> = ({ session }) => {

    return (
        <section className="w-full min-h-screen flex bg-green-200">
            <div className="container px-4 md:px-6 content-center">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div style={{ backgroundImage: "url(./haikei-bg.png)" }} className="bg-neutral-100 dark:bg-neutral-800 mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square" />
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
                                El mejor software de gestión<br />
                                para tu equipo o empresa
                            </h1>
                            <p className="mt-12 text-neutral-500 md:text-xl dark:text-neutral-400">
                                Dale a tu organización la capacidad de manejar en tiempo real
                                toda su información. Opera sobre los trabajadores de tu equipo
                                y garantiza una confiable zona laboral.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button
                                className="inline-flex flex-1 h-10 items-center bg-neutral-900 justify-center rounded-md text-lg font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-800/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                            >
                                Ver tutorial
                            </Button>
                            {
                                (session?.user)
                                    ? (
                                        <Link href="/management" className="flex-1 bg-sky-500 text-lg hover:bg-sky-600 inline-flex h-10 items-center justify-center rounded-md font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-800/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300">Gestionar mi equipo</Link>
                                    ) : (
                                        <Link href="/sign-in" className="flex-1 bg-sky-500 text-lg hover:bg-sky-600  inline-flex h-10 items-center justify-center rounded-md font-medium text-neutral-50 shadow transition-colors">Iniciar sesión</Link>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}