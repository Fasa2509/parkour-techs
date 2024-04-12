import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignInPage() {

  return (
    <section className="p-8 flex min-h-screen content-center justify-evenly bg-gradient-to-b from-green-200 to-green-400">
      <section className="flex-1 flex-col p-6 hidden md:flex bg-white rounded-sm max-w-[560px]">
        <h1 className="from-neutral-700 text-3xl font-bold">
          Adéntrate en la gestión de equipos<br />
          Inicia en Parkour Techs
        </h1>
        <p className="from-neutral-500 text-base mt-4">Parkour Techs es lo último en cuanto a software de gestión y control de equipos. Utiliza solo lo mejor para tu empresa.</p>
        <p className="from-neutral-500 text-base mt-4"> Acercamos a ti diversas posibilidades para que mantengas a tu equipo al día con las características más avanzadas y la mejor tecnología, garantizando un trabajo seguro y eficiente.</p>
        <div className="grow"></div>
        <div style={{ backgroundImage: "url(./haikei-bg.png)" }} className="mt-4 mx-auto aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xl object-cover object-center sm:w-full lg:order-last" />
      </section>
      <SignUpForm />
    </section>
  );
};

