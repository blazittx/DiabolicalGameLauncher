import React, { useEffect, useState } from 'react';
import { colors } from '../theme/colors';

const AppLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const showBorder = typeof window !== 'undefined' && !window.api;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className={`overflow-hidden flex ${isMobile ? 'flex-col' : 'flex-row'} w-full h-full p-3 gap-3 rounded-sm${!isMobile && showBorder ? ' border' : ''}`}
      style={{
        maxHeight:
          !window.electronAPI && isMobile ? 'none' : !window.electronAPI ? '720px' : undefined,
        maxWidth:
          !window.electronAPI && isMobile ? 'none' : !window.electronAPI ? '1280px' : undefined,
        width: isMobile ? '100svw' : undefined,
        height: isMobile ? '100svh' : undefined,
        position: 'relative',
        overflowY: 'hidden',
        borderColor: !isMobile && showBorder ? colors.border : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default AppLayout;
