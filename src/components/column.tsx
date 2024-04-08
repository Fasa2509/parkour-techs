"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CompleteWorker } from "prisma/zod/worker"
import { Button } from "./ui/button";
import { deleteWorker, updateWorker } from "@/lib/db/methods/dbWorker";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import { ValidStatus, WorkerStatus } from "@/lib/types/Worker";
import { toast } from "sonner";
import { UpdateWorkerForm } from "./forms/UpdateWorkerForm";


export const columns: ColumnDef<Omit<CompleteWorker, 'user'>>[] = [
    {
        accessorKey: "id",
        header: "Actualizar",
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            const email = row.getValue("email") as string;
            const name = row.getValue("name") as string;
            const ci = row.getValue("ci") as number;
            const phone = row.getValue("phone") as string;
            const direction = row.getValue("direction") as string;
            const salary = row.getValue("salary") as number;
            const hours = row.getValue("hours") as number;
            const status = row.getValue("status") as WorkerStatus;

            let workerInfo = {
                id,
                email,
                name,
                ci,
                phone,
                direction,
                salary,
                hours,
                status,
            }

            return (
                <Popover>
                    <PopoverTrigger className="p-4 bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-md">Actualizar</PopoverTrigger>
                    <PopoverContent>
                        <UpdateWorkerForm workerInfo={workerInfo} />
                    </PopoverContent>
                </Popover>
            )
        }
    },
    {
        accessorKey: "email",
        header: "Email",

    },
    {
        accessorKey: "name",
        header: "Nombre"
    },
    {
        accessorKey: "ci",
        header: "Cédula"
    },
    {
        accessorKey: "phone",
        header: "Teléfono"
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            const status = row.getValue("status") as string;
            const name = row.getValue("name") as string;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>{status}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {
                            ValidStatus.map((status) => <DropdownMenuItem onClick={async () => {
                                const accepted = window.confirm(`¿Cambiar a ${status} el estado de ${name}?`);

                                if (!accepted) return;

                                const res = await updateWorker(id, { status });

                                toast(res.message);
                            }}>{status}</DropdownMenuItem>)
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
    {
        accessorKey: "hours",
        header: "Horas",
    },
    {
        accessorKey: "salary",
        header: "Salario",
    },
    {
        accessorKey: "direction",
        header: "Dirección",
        cell: ({ row }) => <span className="max-w-[260px] overflow-x-auto">{row.getValue("direction")}</span>
    },
    {
        accessorKey: "id",
        header: "Eliminar",
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            const name = row.getValue("name");

            return <Button className="bg-red-500 hover:bg-red-700" onClick={async () => {
                const accepted = window.confirm(`¿Eliminar a ${name}?`);

                if (!accepted) return;

                const res = await deleteWorker(id);

                console.log(res)
            }}>Eliminar</Button>
        }
    },
]