'use client'
import { FC, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";

import { CompleteWorker } from "prisma/zod/worker"
import { DataTable } from "./data-table"
import { CreateWorkerForm } from "./forms/CreateWorkerForm"
import { columns, getColumns } from "./column";
import { WorkerContext } from "@/lib/context/WorkerContext";
import { SearchWorkerForm } from "./forms/SearchWorkerForm";
import Link from "next/link";
import { Session } from "next-auth";

interface Props {
    session: Session;
    workers: Omit<CompleteWorker, 'user' | 'userId'>[];
}

export const WorkersInfo: FC<Props> = ({ session, workers: workersInfo }) => {

    const { workers, setWorkers } = useContext(WorkerContext);

    useEffect(() => setWorkers(workersInfo), []);

    return (
        <div className="mx-2 md:mx-8 lg:mx-10 flex flex-col gap-8">
            <div className="flex-1 flex flex-col md:flex-row gap-6 justify-evenly">
                <CreateWorkerForm />
                <div className="bg-white dark:bg-zinc-800 p-4 mx-auto md:py-6 md:px-8 flex-1 rounded-md max-w-[600px] flex flex-col gap-6 justify-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-sky-500">Buscar trabajador</h2>
                    <p className="text-neutral-700 dark:text-neutral-300 md:text-xl lg:text-base xl:text-xl md:text-justify">Busca en nuestra DB y filtra la información de los trabajadores por los campos que gustes. Podrás ver los resultados de tu búsqueda en tiempo real y sobre todas las entradas.</p>
                    <Link className="bg-sky-500 text-white text-base text-center rounded-sm py-2" href="/search">Buscar trabajador</Link>
                </div>
            </div>
            <div className="bg-white dark:bg-zinc-800 rounded-md">
                <div className="p-4">
                    <p className="text-2xl font-bold">Trabajadores de {session?.user.name}</p>
                </div>
                {workers && <DataTable columns={getColumns(setWorkers)} data={workers} />}
            </div>
        </div>
    )
}