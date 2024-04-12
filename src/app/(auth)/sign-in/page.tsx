import { SignInForm } from "@/components/auth/SignIn";

export default function SignInPage() {

  return (
    <section className="p-8 flex min-h-screen content-center justify-evenly bg-gradient-to-b from-green-200 to-green-400">
      <section className="flex-1 px-8 py-6 hidden md:block bg-white rounded-sm max-w-[550px]">
        <h1 className="from-neutral-700 text-4xl font-bold">
          Parkour Techs, manejo y control de equipos
        </h1>
        <p className="from-neutral-500 text-base mt-4">Maneja todo tu equipo o empresa desde un solo sitio hasta cualquier parte, <span className="font-bold">a un solo click {";)"}</span>.</p>
        <p className="from-neutral-500 text-base mt-4">Culpa minim in proident eiusmod. Laborum ea enim minim pariatur est excepteur. Incididunt eiusmod veniam velit amet reprehenderit. Exercitation exercitation eu exercitation aute ut ad aliqua velit ex. Exercitation dolor est laboris velit commodo aliquip cillum ad est deserunt do esse.</p>
        <div style={{ backgroundImage: "url(./haikei-bg.png)" }} className="mt-4 mx-auto aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xl object-cover object-center sm:w-full lg:order-last" />
      </section>
      <SignInForm />
    </section>
  );
};

