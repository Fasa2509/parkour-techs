'use client'
import { useState } from "react";

import { CompleteWorker } from "prisma/zod/worker";
import { SearchWorkerForm } from "@/components/forms/SearchWorkerForm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const SearchWorker = () => {

    const [workers, setWorkers] = useState<Omit<CompleteWorker, 'user' | 'userId'>[]>([]);

    return (
        <>
            <div className="bg-white rounded-md mx-2 md:mx-8 lg:mx-10">
                <SearchWorkerForm setWorkers={setWorkers} />
            </div>
            <div className="bg-white rounded-md mx-2 my-8 md:mx-8 lg:mx-10">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Cédula</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead>Dirección</TableHead>
                            <TableHead>Salario</TableHead>
                            <TableHead>Horas</TableHead>
                            <TableHead>Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            workers.map((worker) => {
                                const formatter = new Intl.NumberFormat("en-US", {
                                    currency: "USD",
                                    style: "currency"
                                });

                                return (
                                    <TableRow key={worker.id}>
                                        <TableCell>{worker.id}</TableCell>
                                        <TableCell>{worker.email}</TableCell>
                                        <TableCell>{worker.name}</TableCell>
                                        <TableCell>{worker.ci}</TableCell>
                                        <TableCell>{worker.phone}</TableCell>
                                        <TableCell>{worker.direction}</TableCell>
                                        <TableCell>{formatter.format(worker.salary)}</TableCell>
                                        <TableCell>{worker.hours}</TableCell>
                                        <TableCell>{worker.status}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    )
}