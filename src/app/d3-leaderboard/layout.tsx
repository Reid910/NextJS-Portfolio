import "../globals.css";
import "../leaderboard.css";

import { ReactNode } from 'react';

import NavBar from '@/components/D3Components/NavBar';
import Shadows from "@/components/D3Components/Shadows";

export default function RootLayout({ children }: { children: ReactNode}) {
  return (
    <div className="background">
      <Shadows/>
      <NavBar/>
      {children}
    </div>
  );
}
