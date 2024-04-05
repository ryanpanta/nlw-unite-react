import React, { ComponentProps } from "react";

interface TableHeaderProps extends ComponentProps<'th'> {}

export default function TableHeader(props: TableHeaderProps) {
    return (
        <th className="py-3 px-4 font-semibold text-sm text-left" {...props}/>
    );
}
