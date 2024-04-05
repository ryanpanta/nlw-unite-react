import React, { ComponentProps } from "react";

interface TableProps extends ComponentProps<"table"> {

}

export default function Table(props: TableProps) {
    return (
        <div className=" border border-white/20 rounded-lg ">
            <table className="w-full" {...props}/>
        </div>
    );
}
