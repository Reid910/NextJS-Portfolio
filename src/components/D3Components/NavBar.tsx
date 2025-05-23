'use client'

import NavButton from './NavButton';

export default function Navbar() {
    return (
        <nav
            className="fixed w-full z-50"
        >
            <div className='w-full truncate ml-2'>
                {/* <Image src='/vercel.svg' width={45} height={45} alt='Test'
                    className='relative mx-5 mt-2 float-left'
                /> */}
                <NavButton label="Home" to='/'/>
                {/* <NavButton label="Leaderboard" to='/leaderboards' txt='Normal' /> */}
                <NavButton label="Leaderboard" to='/d3-leaderboard'/>
                {/* <NavButton label="Items" />
                <NavButton label="Character" /> */}
            </div>
        </nav>
    );
}
