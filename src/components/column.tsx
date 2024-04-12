"use client"
import { Dispatch, SetStateAction } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { CompleteWorker } from "prisma/zod/worker";
import { Button } from "./ui/button";
import { deleteWorker, updateWorker } from "@/lib/db/methods/dbWorker";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { ValidStatus, WorkerStatus } from "@/lib/types/Worker";
import { UpdateWorkerForm } from "./forms/UpdateWorkerForm";


const formatter = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency"
});


export const getColumns = (setWorkers: Dispatch<SetStateAction<Omit<CompleteWorker, 'user' | 'userId'>[]>>): ColumnDef<Omit<CompleteWorker, 'user' | 'userId'>>[] => {
    return [
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
                        <PopoverTrigger className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-md">Actualizar</PopoverTrigger>
                        <PopoverContent className="p-0">
                            <UpdateWorkerForm workerInfo={workerInfo} />
                        </PopoverContent>
                    </Popover>
                )
            }
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nombre
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "ci",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Cédula
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "phone",
            header: "Teléfono"
        },
        {
            accessorKey: "status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Estado
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const id = row.getValue("id") as string;
                const status = row.getValue("status") as string;
                const name = row.getValue("name") as string;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger>{status}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {
                                ValidStatus.map((status) => <DropdownMenuItem key={id} onClick={async () => {
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
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Salario
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                let salary = formatter.format(row.getValue("salary"))

                return <span className="font-bold">{salary}</span>
            }
        },
        {
            accessorKey: "direction",
            header: "Dirección",
            cell: ({ row }) => <span className="max-w-[260px] overflow-x-auto">{row.getValue("direction")}</span>
        },
        {
            accessorKey: "id-delete",
            header: "Eliminar",
            cell: ({ row }) => {
                const id = row.getValue("id") as string;
                const name = row.getValue("name");

                return <Button className="bg-red-500 hover:bg-red-700 dark:text-white" onClick={async () => {
                    const accepted = window.confirm(`¿Eliminar a ${name}?`);

                    if (!accepted) return;

                    const res = await deleteWorker(id);

                    toast(res.message[0]);
                    !res.error && setWorkers((prevState) => prevState.filter((worker) => worker.id !== id));
                }}>Eliminar</Button>
            }
        },
    ]
}

export const columns: ColumnDef<Omit<CompleteWorker, 'user' | 'userId'>>[] = [
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
                    <PopoverTrigger className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-md">Actualizar</PopoverTrigger>
                    <PopoverContent className="p-0">
                        <UpdateWorkerForm workerInfo={workerInfo} />
                    </PopoverContent>
                </Popover>
            )
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "ci",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cédula
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "phone",
        header: "Teléfono"
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Estado
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            const status = row.getValue("status") as string;
            const name = row.getValue("name") as string;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>{status}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {
                            ValidStatus.map((status) => <DropdownMenuItem key={id} onClick={async () => {
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
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Salario
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            let salary = formatter.format(row.getValue("salary"))

            return <span className="font-bold">{salary}</span>
        }
    },
    {
        accessorKey: "direction",
        header: "Dirección",
        cell: ({ row }) => <span className="max-w-[260px] overflow-x-auto">{row.getValue("direction")}</span>
    },
    {
        accessorKey: "id-delete",
        header: "Eliminar",
        cell: ({ row }) => {
            const id = row.getValue("id") as string;
            const name = row.getValue("name");

            return <Button className="bg-red-500 hover:bg-red-700 dark:text-white" onClick={async () => {
                const accepted = window.confirm(`¿Eliminar a ${name}?`);

                if (!accepted) return;

                const res = await deleteWorker(id);


            }}>Eliminar</Button>
        }
    },
]
