import React from "react";
import {
    Search,
    Ellipsis,
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react";

export default function AttendeeList() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/20 rounded-lg text-sm flex items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input
                        className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm ring-0"
                        type="text"
                        placeholder="Buscar participante..."
                    />
                </div>
            </div>
            <div className=" border border-white/20 rounded-lg ">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/20">
                            <th className="w-12 py-3 px-4 font-semibold text-sm text-left">
                                <input
                                    type="checkbox"
                                    name=""
                                    id=""
                                    className="size-4 bg-black/20 rounded border border-white/20 focus:ring-0 focus:ring-offset-0 text-orange-400"
                                />
                            </th>
                            <th className="py-3 px-4 font-semibold text-sm text-left">
                                Código
                            </th>
                            <th className="py-3 px-4 font-semibold text-sm text-left">
                                Participante
                            </th>
                            <th className="py-3 px-4 font-semibold text-sm text-left">
                                Data da inscrição
                            </th>
                            <th className="py-3 px-4 font-semibold text-sm text-left">
                                Data do check-in
                            </th>
                            <th className="w-16"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 8 }).map((_, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="border-b border-white/20 hover:bg-white/10"
                                >
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            className="size-4 bg-black/20 rounded border border-white/20 focus:ring-0 focus:ring-offset-0 text-orange-400"
                                        />
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        52712
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <div className="flex flex-col gap-1 ">
                                            <span className="font-semibold text-white ">
                                                Diego Schell Fernandes
                                            </span>
                                            <span>diego@rocketseat.com.br</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        7 dias atrás
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        3 dias atrás
                                    </td>
                                    <td className="py-3 px-4 text-sm text-zinc-300">
                                        <button className="bg-black/20 border border-white/20 rounded-md p-1.5">
                                            <Ellipsis className="size-4" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td
                                colSpan={3}
                                className="py-3 px-4 font-semibold text-sm text-left"
                            >
                                Mostrando 10 de 228 itens
                            </td>
                            <td
                                colSpan={3}
                                className="py-3 px-4 font-semibold text-sm text-right"
                            >
                                <div className="flex gap-8 items-center justify-end">
                                    <span>Página 1 de 23</span>
                                    <div className="flex gap-1.5">
                                        <button className="bg-white/20 border border-white/20 rounded-md p-1.5">
                                            <ChevronsLeft className="size-4" />
                                        </button>
                                        <button className="bg-white/20 border border-white/20 rounded-md p-1.5">
                                            <ChevronLeft className="size-4" />
                                        </button>
                                        <button className="bg-white/20 border border-white/20 rounded-md p-1.5">
                                            <ChevronRight className="size-4" />
                                        </button>
                                        <button className="bg-white/20 border border-white/20 rounded-md p-1.5">
                                            <ChevronsRight className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
