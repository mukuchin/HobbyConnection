import { ButtonHTMLAttributes } from "react";

export default function DangerButton({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-xl text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                }  transition duration-300 soft-gloss bg-gradient-to-b from-soft-gloss-light to-soft-gloss-dark shadow-soft-gloss-inset` +
                className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
