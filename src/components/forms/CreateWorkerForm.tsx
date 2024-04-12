"use client"
import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";

import { toast } from "sonner";
import { TNewWorker, ValidStatus } from "@/lib/types/Worker";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { createWorker } from "@/lib/db/methods/dbWorker";
import { WorkerContext } from "@/lib/context/WorkerContext";

const formInitialState: TNewWorker & { lastname: string } = {
    email: "",
    name: "",
    lastname: "",
    ci: 0,
    phone: "",
    direction: "",
    salary: 0,
    hours: 0,
    status: "active",
}

export const CreateWorkerForm: FC = () => {

    const [formState, setFormState] = useState<TNewWorker & { lastname: string }>(formInitialState);
    const [isLoading, setIsLoading] = useState(false);

    const { setWorkers } = useContext(WorkerContext);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const { lastname, ...body } = formState;

        setIsLoading(true);
        const res = await createWorker({
            ...body,
            name: body.name.trim() + " " + lastname.trim()
        });
        setIsLoading(false);

        toast(res.message[0]);
        !res.error && setWorkers((prevState) => [res.payload.worker, ...prevState]);
    };

    return (
        <form className="flex flex-col gap-6 mx-auto rounded-md bg-white dark:bg-zinc-800 p-4 md:py-6 md:px-8 flex-1 max-w-[600px]" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-center">
                Crear trabajador
            </h3>

            <div className="relative h-11 w-full min-w-[200px]">
                <input
                    name="email"
                    type="email"
                    placeholder="Correo"
                    className="w-full border-b bg-transparent pt-4 pb-1.5 text-sm font-normal outline outline-0 transition-all focus:border-gray-900 dark:focus:border-gray-300 focus:outline-0 disabled:border-0"
                    required
                    value={formState.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState((prevState) => ({ ...prevState, email: e.target.value }))}
                />
                <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Correo del trabajador
                </label>
            </div>

            <div className="flex gap-4">
                <div className="relative h-11 w-full min-w-[150px]">
                    <input
                        name="name"
                        type="text"
                        placeholder="Nombre/s"
                        className="w-full border-b bg-transparent pt-4 pb-1.5 text-sm font-normal outline outline-0 transition-all focus:border-gray-900 dark:focus:border-gray-300 focus:outline-0 disabled:border-0"
                        required
                        value={formState.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState((prevState) => ({ ...prevState, name: e.target.value }))}
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Nombre
                    </label>
                </div>
                <div className="relative h-11 w-full min-w-[150px]">
                    <input
                        name="lastname"
                        type="text"
                        placeholder="Apellido/s"
                        className="w-full border-b bg-transparent pt-4 pb-1.5 text-sm font-normal outline outline-0 transition-all focus:border-gray-900 dark:focus:border-gray-300 focus:outline-0 disabled:border-0"
                        required
                        value={formState.lastname}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState((prevState) => ({ ...prevState, lastname: e.target.value }))}
                    />
                    <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Apellido
                    </label>
                </div>
            </div>

            <div className="relative h-11 w-full min-w-[200px]">
                <input
                    name="cedula"
                    type="number"
                    placeholder="11.111.111"
                    className="w-full border-b bg-transparent pt-4 pb-1.5 text-sm font-normal outline outline-0 transition-all focus:border-gray-900 dark:focus:border-gray-300 focus:outline-0 disabled:border-0"
                    required
                    min={1_000_000}
                    value={formState.ci}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState((prevState) => ({ ...prevState, ci: Number(e.target.value) }))}
                />
                <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Cédula
                </label>
            </div>

            <div className="relative h-11 w-full min-w-[200px]">
                <input
                    name="phone"
                    type="text"
                    placeholder="04121111111"
                    className="w-full border-b bg-transparent pt-4 pb-1.5 text-sm font-normal outline outline-0 transition-all focus:border-gray-900 dark:focus:border-gray-300 focus:outline-0 disabled:border-0"
                    required
                    value={formState.phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState((prevState) => ({ ...prevState, phone: e.target.value }))}
                />
                <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Teléfono
                </label>
            </div>

            <div className="relative z-10 h-11 w-full min-w-[200px] flex content-center gap-4">
                <label className="self-center">Estado</label>
                <div className="self-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="border-green-500 border-2 bg-white dark:bg-zinc-600 px-2 py-1 rounded-sm">{formState.status}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {
                                ValidStatus.map((status) => <DropdownMenuItem key={status} className={`px-2 py-1 bg-white dark:bg-zinc-600 dark:hover:bg-zinc-400 outline-green-300 hover:bg-gray-300/90 ${formState.status === status ? "bg-green-400" : ""}`} onClick={() => setFormState((prevState) => ({ ...prevState, status }))}>{status}</DropdownMenuItem>)
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="relative h-11 w-full min-w-[200px]">
                <input
                    name="hours"
                    type="number"
                    placeholder="100"
                    className="w-full border-b bg-transparent pt-4 pb-1.5 text-sm font-normal outline outline-0 transition-all focus:border-gray-900 dark:focus:border-gray-300 focus:outline-0 disabled:border-0"
                    required
                    min={0}
                    value={formState.hours}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState((prevState) => ({ ...prevState, hours: Number(e.target.value) }))}
                />
                <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Horas laborales
                </label>
            </div>

            <div className="relative h-11 w-full min-w-[200px]">
                <input
                    name="salary"
                    type="number"
                    placeholder="1.000"
                    className="w-full border-b bg-transparent pt-4 pb-1.5 text-sm font-normal outline outline-0 transition-all focus:border-gray-900 dark:focus:border-gray-300 focus:outline-0 disabled:border-0"
                    required
                    min={0}
                    value={formState.salary}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormState((prevState) => ({ ...prevState, salary: Number(e.target.value) }))}
                />
                <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Salario
                </label>
            </div>

            <div className="relative h-11 w-full min-w-[200px]">
                <textarea
                    name="direction"
                    placeholder="Silent St."
                    rows={2}
                    className="resize-none w-full border-b bg-transparent pt-4 pb-1.5 text-sm font-normal outline outline-0 transition-all focus:border-gray-900 dark:focus:border-gray-300 focus:outline-0 disabled:border-0"
                    required
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormState((prevState) => ({ ...prevState, direction: e.target.value }))}
                    value={formState.direction}
                ></textarea>
                <label className="after:content[' '] pointer-events-none absolute left-0  -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-sm font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Dirección
                </label>
            </div>

            <div className="relative h-11 w-full min-w-[200px] mt-4">
                <Button type="submit"
                    disabled={isLoading}
                    className="w-full border-2 text-lg border-green-300 hover:bg-white hover:text-green-300 bg-green-300 text-white dark:bg-green-500 dark:border-green-500 dark:hover:bg-transparent dark:hover:text-green-500"
                >
                    Crear trabajador
                </Button>
            </div>
        </form>
    )
}