'use client'

import { Button } from "../ui/button";
import { ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { CompleteWorker } from "prisma/zod/worker";
import { searchWorker } from "@/lib/db/methods/dbWorker";
import { toast } from "sonner";

interface Props {
    setWorkers: (workers: Omit<CompleteWorker, 'user' | 'userId'>[]) => void;
}

export const SearchWorkerForm: FC<Props> = ({ setWorkers }) => {
    const [formState, setFormState] = useState<Pick<CompleteWorker, 'email' | 'name' | 'ci' | 'direction'>>({
        ci: 0,
        direction: "",
        email: "",
        name: ""
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const body: any = {};

        for (let key in formState) {
            if (formState[key as keyof typeof formState]) body[key] = formState[key as keyof typeof formState];
        }

        const res = await searchWorker(body);

        toast(res.message[0]);
        !res.error && setWorkers(res.payload.workers);
    }

    return (
        <div className="w-full bg-white p-4 mx-auto md:py-6 md:px-8 flex-1 rounded-md flex flex-col gap-6 justify-center">
            <h3 className="text-4xl md:text-4xl font-bold text-center text-sky-500">Buscar trabajador</h3>
            <form className="w-full flex flex-col justify-center gap-6 mx-auto rounded-md bg-white p-4 pb-0 md:pt-6 md:px-8 flex-1" onSubmit={handleSubmit}>

                <div className="w-full flex flex-col lg:flex-row justify-center gap-4">
                    <div className="relative grow h-11 w-full min-w-[200px]">
                        <input
                            name="email"
                            type="text"
                            placeholder="Correo"
                            className="w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            value={formState.email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState((prevState) => ({ ...prevState, email: e.target.value }))}
                        />
                        <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Correo del trabajador
                        </label>
                    </div>

                    <div className="relative grow h-11 w-full min-w-[150px]">
                        <input
                            name="name"
                            type="text"
                            placeholder="Nombre"
                            className="w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            value={formState.name}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState((prevState) => ({ ...prevState, name: e.target.value }))}
                        />
                        <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Nombre
                        </label>
                    </div>

                    <div className="relative grow h-11 w-full min-w-[200px]">
                        <input
                            name="cedula"
                            type="number"
                            placeholder="11.111.111"
                            className="w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            value={formState.ci}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState((prevState) => ({ ...prevState, ci: Number(e.target.value) }))}
                        />
                        <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Cédula
                        </label>
                    </div>

                    <div className="relative grow h-11 w-full min-w-[200px]">
                        <textarea
                            name="direction"
                            placeholder="Silent St."
                            rows={2}
                            className="resize-none w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormState((prevState) => ({ ...prevState, direction: e.target.value }))}
                        >{formState.direction}</textarea>
                        <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Dirección
                        </label>
                    </div>
                </div>

                <div className="relative h-11 w-full min-w-[200px] mt-4">
                    <Button type="submit"
                        className="w-full border-2 border-transparent hover:border-green-300 text-lg hover:bg-white hover:text-green-300 bg-green-300 text-white"
                    >
                        Buscar trabajador
                    </Button>
                </div>
            </form>
        </div>
    )
};
