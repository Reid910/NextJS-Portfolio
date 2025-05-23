import React, { ReactNode } from 'react';

function ScrollingFrame({ children }: { children?: ReactNode}) {
  return (
    <div className='rounded w-full min-h-0 max-h-full px-3 overflow-y-auto border border-gray-700'>
      {children}
    </div>
  );
}

export default ScrollingFrame;
