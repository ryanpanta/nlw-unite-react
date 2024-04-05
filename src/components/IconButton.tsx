import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<"button"> {
    transparent?: boolean;
}

export default function IconButton({ transparent, ...props }: IconButtonProps) {
    return (
        <button
            {...props}
            /* className={
                transparent
                    ? "bg-black/20 border border-white/20 rounded-md p-1.5"
                    : "bg-white/20 border border-white/20 rounded-md p-1.5"
            } */
            className={twMerge(
                "border border-white/20 rounded-md p-1.5",
                transparent ? "bg-black/20" : "bg-white/20",
                props.disabled ? "opacity-50" : null
            )}
        />
    );
}
