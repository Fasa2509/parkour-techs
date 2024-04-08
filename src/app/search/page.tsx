'use client'

import { Navbar } from "@/components/Navbar";
import { SearchWorkerForm } from "@/components/forms/SearchWorkerForm";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CompleteWorker } from "prisma/zod/worker";
import { useState } from "react";

export default function SearchPage() {

    const [workers, setWorkers] = useState<Omit<CompleteWorker, 'user' | 'userId'>[]>([]);

    return (
        <section className="min-h-screen bg-gradient-to-b from-green-200 to-green-400 pb-8">
            <Navbar />
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
                                    <TableRow>
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
        </section>
    )
};
