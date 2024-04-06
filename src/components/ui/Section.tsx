import { useSession } from "next-auth/react";


export const Section = () => {
    const { data: session, status } = useSession();


    return (
        <section>
            Hola Mundo!
            <div>
                {
                    JSON.stringify(session)
                }
            </div>
            <div>
                {
                    JSON.stringify(status)
                }
            </div>
        </section>
    )
}