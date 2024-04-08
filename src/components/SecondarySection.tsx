

export const SecondarySection = () => {

    return (
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
                            con rápida adaptabilidad y manejo de recursos.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
                    <div style={{ backgroundImage: "url(./haikei-bg.png)" }} className="mx-auto aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xl object-cover object-center sm:w-full lg:order-last" />
                    <div className="flex flex-col justify-center space-y-4">
                        <p
                            className="text-neutral-500 md:text-xl lg:text-base xl:text-xl text-justify"
                        >Consectetur sit do enim sint voluptate aliquip sint irure sit commodo quis sunt qui. Consequat laboris Lorem cillum consequat irure reprehenderit ad occaecat exercitation sint deserunt ipsum in labore. Id dolor eu eiusmod aliquip sunt anim ex velit veniam commodo. Consequat ipsum nulla eiusmod velit exercitation dolore est officia non id id aliquip officia. Lorem amet mollit culpa officia excepteur aliqua officia reprehenderit enim. Exercitation do irure laborum eiusmod ad.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}