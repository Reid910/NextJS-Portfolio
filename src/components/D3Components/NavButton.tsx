import Link from 'next/link';

export default function NavButton({ label, to }: {label: string, to: string}) {
    console.log(label,to);
    return (
        <div className='relative -mx-4 pl-3 py-3 float-left'>
            <Link
                href={to || '/'}
                // style={{background: 'linear-gradient(0.3turn, black, rgba(0,0,0,0))'}}
                className="text-white border-b border-gray-600 px-12 py-2 bg-gray-900 hover:border-white hover:border-b-12 hover:bg-gray-600 text-lg font-semibold uppercase transition-all clip-path-diagonal"
                // className="relative border-b mx-3 px-12 py-2 bg-black hover:bg-gray-600 text-lg font-semibold uppercase transition-all"
            >
                {label}
            </Link>
            {/* {txt && <h1 className='absolute text-xs font-semibold font-normal top-0 left-1/3' > {txt} </h1> } */}
        </div>
    );
}

// clip-path-diagonal
// shadow-[4px_0_0_lightgreen]
