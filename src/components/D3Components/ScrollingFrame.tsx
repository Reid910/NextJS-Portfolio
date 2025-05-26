import React, { ReactNode } from 'react';

function ScrollingFrame({ children }: { children?: ReactNode}) {
  return (
    <div className='rounded w-full max-h-screen px-3 overflow-y-auto border border-gray-700'>
      {children}
    </div>
  );
}

export default ScrollingFrame;
