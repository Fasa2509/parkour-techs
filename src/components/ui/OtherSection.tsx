'use client'
import { baseApi } from "@/lib/api/Api"
import { signOut } from "next-auth/react"


export const OtherSection = () => {

    return (
        <section>
            <div>
                <button onClick={() => baseApi.get('/user')}>Enviar solicitud</button>
            </div>
            <button onClick={() => signOut()}>
                Cerrar Sesion
            </button>
        </section>
    )
}