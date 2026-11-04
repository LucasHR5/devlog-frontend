import type { InputHTMLAttributes } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    id: string;
}

export function FormField({ label, id, ...inputProps }: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm font-medium text-slate-700">
                {label}
            </label>

            <input
                id={id}
                className="rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                {...inputProps}
            />
        </div>
    );
}