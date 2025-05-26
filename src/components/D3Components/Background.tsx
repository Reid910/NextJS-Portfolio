import { ReactNode } from "react";

export default function Bg ({children}: {children?: ReactNode}) {
    return (
        <div
            style={{background: 'rgba(0,0,0,0.8)'}}
            className="min-h-full w-full md:w-2/3 px-15 pt-30 pb-10 mx-auto border-x-2 border-gray-800"
        >
            {children}
        </div>
    )
}
