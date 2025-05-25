import { Dispatch, SetStateAction } from "react";

interface Option {
    value: string;
    txt?: string;
}

interface DropdownProps<T extends string | number | boolean> {
    Options: Option[];
    Selected?: T;
    setSelectedStat: Dispatch<SetStateAction<T>>;
    label?: string;
    className?: string;
}

export default function Dropdown<T extends string | number | boolean>({
    Options,
    Selected,
    setSelectedStat,
    label,
    className,
}: DropdownProps<T>) {
    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor="dropdown"
                    className="absolute top-0 left-1/16 transform -translate-y-1/2 text-xs font-semibold text-gray-300"
                >
                    {label}
                </label>
            )}
            <select
                value={Selected?.toString() ?? ""}
                onChange={(e) => {
                    const value = e.target.value;

                    // Convert back to the original type if necessary
                    let parsedValue: T;
                    if (typeof Selected === "number") {
                        parsedValue = Number(value) as T;
                    } else if (typeof Selected === "boolean") {
                        parsedValue = (value === "true") as T;
                    } else {
                        parsedValue = value as T;
                    }

                    setSelectedStat(parsedValue);
                }}
                className="bg-gray-800 text-white p-2 rounded-md border border-gray-600 shadow-md"
            >
                {Options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.txt || option.value}
                    </option>
                ))}
            </select>
        </div>
    );
}
