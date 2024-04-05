import React, { ChangeEvent, useState } from "react";
import {
    Search,
    Ellipsis,
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";
import IconButton from "./IconButton";
import Table from "./Table/Table";
import TableHeader from "./Table/TableHeader";
import TableCell from "./Table/TableCell";
import { attendees } from "../data/attendees";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");
export default function AttendeeList() {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(attendees.length / 10);

    function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
        setSearch(target.value);
    }

    function goToNextPage() {
        setPage(page + 1);
    }

    function goToPreviousPage() {
        setPage(page - 1);
    }

    function goToFirstPage() {
        setPage(1);
    }

    function goToLastPage() {
        setPage(totalPages);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/20 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input
                        onChange={handleChange}
                        className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm ring-0"
                        type="text"
                        placeholder="Buscar participante..."
                    />
                </div>
            </div>
            <Table>
                <thead>
                    <tr className="border-b border-white/20">
                        <TableHeader className="w-12 py-3 px-4 font-semibold text-sm text-left">
                            <input
                                type="checkbox"
                                name=""
                                id=""
                                className="size-4 bg-black/20 rounded border border-white/20 focus:ring-0 focus:ring-offset-0 text-orange-400"
                            />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data da inscrição</TableHeader>
                        <TableHeader>Data do check-in</TableHeader>
                        <TableHeader className="w-16"></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees
                        .slice((page - 1) * 10, page * 10)
                        .map((attendee, index) => {
                            return (
                                <tr
                                    key={attendee.id}
                                    className="border-b border-white/20 hover:bg-white/10"
                                >
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            className="size-4 bg-black/20 rounded border border-white/20 focus:ring-0 focus:ring-offset-0 text-orange-400"
                                        />
                                    </TableCell>
                                    <TableCell>{attendee.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1 ">
                                            <span className="font-semibold text-white ">
                                                {attendee.name}
                                            </span>
                                            <span>{attendee.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {dayjs().to(dayjs(attendee.createdAt))}
                                    </TableCell>
                                    <TableCell>
                                        {attendee.checkedInAt.toISOString()}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton transparent>
                                            <Ellipsis className="size-4" />
                                        </IconButton>
                                    </TableCell>
                                </tr>
                            );
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando 10 de {attendees.length} itens
                        </TableCell>
                        <TableCell colSpan={3} className="text-right">
                            <div className="flex gap-8 items-center justify-end">
                                <span>
                                    Página {page} de {totalPages}
                                </span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>
        </div>
    );
}
