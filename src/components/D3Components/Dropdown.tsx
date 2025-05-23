import { SetStateAction } from "react";

interface options {
    value: string,
    txt?: string
}

interface select {
    (value: SetStateAction<unknown>): string;
}

export default function Dropdown({Options, Selected, setSelectedStat, label, className}: {Options: [options], Selected?: string, setSelectedStat: select, label?: string, className?: string}) {
    return <div className={className}>
        {/* Add a label that will overlap the dropdown */}
        {label && (
            <label
                htmlFor="dropdown"
                className="absolute top-0 left-1/16 transform -translate-y-1/2 text-xs font-semibold text-gray-300"
            >
                {label}
            </label>
        )}
        <select 
            value={Selected || " "}
            onChange={(e) => setSelectedStat(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded-md border border-gray-600 shadow-md"
        >
            {Options.map(option => (
                <option key={option.value} value={option.value}>{option.txt || option.value}</option>
            ))}
            {/* <option value="Rank">Rank</option>
            <option value="Score">Score</option>
            <option value="Time">Completion Time</option> */}
            {/* Add more ranking criteria here */}
        </select>
    </div>
}
