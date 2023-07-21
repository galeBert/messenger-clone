'use client';
import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';
import React from 'react';
import DesktopItem from './DesktopItem';
import MobileItem from './MobileItem';

export default function MobileFooter() {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className='
    fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t lg:hidden'
    >
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
  );
}
