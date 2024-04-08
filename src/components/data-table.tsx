"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import { PAGINATION_LIMIT } from "@/lib/api/Api";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [page, setPage] = useState(1);

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        },
    })

    return (
        <div className="rounded-md border">
            <div className="flex flex-wrap justify-center gap-x-2">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filtrar emails"
                        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("email")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm outline-none border-2 border-green-300"
                    />
                </div>
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter nombres"
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm outline-none border-2 border-green-300"
                    />
                </div>
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter cédula"
                        value={(table.getColumn("ci")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("ci")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm outline-none border-2 border-green-300"
                    />
                </div>
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter teléfono"
                        value={(table.getColumn("phone")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("phone")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm outline-none border-2 border-green-300"
                    />
                </div>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header: any) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-center space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        table.previousPage();
                        setPage((prevState) => prevState - 1);
                    }}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <span className="text-center">{table.getRowCount()} <br className="sm:hidden" /> trabajadores</span>
                <span className="text-center font-bold">Página <br className="sm:hidden" /> {page} de {table.getPageCount()}</span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        table.nextPage();
                        setPage((prevState) => prevState + 1);
                    }}
                    disabled={!table.getCanNextPage()}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}
