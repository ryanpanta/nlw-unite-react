import React, { ChangeEvent, useEffect, useState } from "react";
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

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Attendee {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    checkInAt: string | null;
}

export default function AttendeeList() {
    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString())
        const search = url.searchParams.get("search")
        return search ? search : ""
    });
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString())
        const page = url.searchParams.get("page")
        return page ? Number(page) : 1
    });
    
    const [total, setTotal] = useState(0);
    const [attendees, setAttendees] = useState<Attendee[]>([]);

    const totalPages = Math.ceil(total / 10);

    useEffect(() => {
        async function fetchAttendees() {
            const url = new URL(
                "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
            );
            url.searchParams.set("pageIndex", String(page - 1));

            if (search.length > 0) {
                url.searchParams.set("query", String(search));
            }

            const response = await fetch(url);
            const data = await response.json();
            setAttendees(data.attendees);
            setTotal(data.total);
        }

        fetchAttendees();

    }, [page, search]);

    function setCurrentSearch(search: string){
        const url = new URL(window.location.toString());
        url.searchParams.set("search", search)
        window.history.pushState({}, '', url)
        setSearch(search)
    }

    function setCurrentPage(page: number){
        const url = new URL(window.location.toString());
        url.searchParams.set("page", String(page))
        window.history.pushState({}, '', url)
        setPage(page)
    }

    function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(target.value);
        setCurrentPage(1);
    }

    function goToNextPage() {
       setCurrentPage(page + 1)
    }

    function goToPreviousPage() {
        setCurrentPage(page - 1);
    }

    function goToFirstPage() {
        setCurrentPage(1);
    }

    function goToLastPage() {
        setCurrentPage(totalPages);
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
                        value={search}
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
                        //.slice((page - 1) * 10, page * 10)
                        .map((attendee) => {
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
                                        {dayjs().to(attendee.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        {attendee.checkInAt === null ? (
                                            <span className="text-zinc-400">
                                                Não fez check-in
                                            </span>
                                        ) : (
                                            dayjs().to(attendee.checkInAt)
                                        )}
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
                            Mostrando {attendees.length} de {total} itens
                        </TableCell>
                        <TableCell colSpan={3} className="text-right">
                            <div className="flex gap-8 items-center justify-end">
                                <span>
                                    Página {page} de {totalPages}
                                </span>
                                <div className="flex gap-1.5">
                                    <IconButton
                                        onClick={goToFirstPage}
                                        disabled={page === 1}
                                    >
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton
                                        onClick={goToPreviousPage}
                                        disabled={page === 1}
                                    >
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton
                                        onClick={goToNextPage}
                                        disabled={page === totalPages}
                                    >
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton
                                        onClick={goToLastPage}
                                        disabled={page === totalPages}
                                    >
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
