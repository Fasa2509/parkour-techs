/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmwTvNfrVgf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
'use client'


import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";


export default function LandingPage() {

  const { data: session, status } = useSession();
  console.log(session)

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full min-h-screen flex bg-green-200">
          <div className="container px-4 md:px-6 content-center">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="bg-neutral-100 dark:bg-neutral-800 mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square" />
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
                        <Button className="flex-1 bg-sky-500 text-lg hover:bg-sky-600" onClick={() => signIn("google", { callbackUrl: "/management" })}>Iniciar sesión con Google</Button>
                      )
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full min-h-screen content-center bg-gradient-to-b from-green-200 to-green-400">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Gestión eficiente. Trabaja inteligente.
                </h2>
                <p className="max-w-[900px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
                  Tú y tu equipo podrán iterar eficazmente sobre
                  diversos medios de trabajo sin casi perder tiempo,
                  con rápida adaptabilidad y menajo de recursos.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
              <div className="mx-auto aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xl object-cover object-center sm:w-full lg:order-last" />
              <div className="flex flex-col justify-center space-y-4">
                <p
                  className="text-neutral-500 md:text-xl lg:text-base xl:text-xl text-justify"
                >Consectetur sit do enim sint voluptate aliquip sint irure sit commodo quis sunt qui. Consequat laboris Lorem cillum consequat irure reprehenderit ad occaecat exercitation sint deserunt ipsum in labore. Id dolor eu eiusmod aliquip sunt anim ex velit veniam commodo. Consequat ipsum nulla eiusmod velit exercitation dolore est officia non id id aliquip officia. Lorem amet mollit culpa officia excepteur aliqua officia reprehenderit enim. Exercitation do irure laborum eiusmod ad.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
