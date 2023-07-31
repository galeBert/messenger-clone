'use client';
import useRoutes from '@/app/hooks/useRoutes';
import { User } from '@prisma/client';
import React, { useState } from 'react';
import Avatar from '../Avatar';
import DesktopItem from './DesktopItem';
import SettingModal from './SettingModal';

interface DesktopSidebarProps {
  currentUser: User | null;
}
export default function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <SettingModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div
        className='
    hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r lg:pb-4 lg:flex lg:flex-col justify-between'
      >
        <nav className='mt-4 flex flex-col justify-between'>
          <ul role='list' className='flex flex-col items-center space-y-1'>
            {routes.map((item, idx) => {
              return (
                <DesktopItem
                  key={idx}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={item.active}
                  onClick={item.onClick}
                />
              );
            })}
          </ul>
        </nav>
        <nav className='mt-4 flex flex-col justify-between items-center'>
          <div
            className='cursor-pointer hover:opacity-75 transition'
            onClick={() => setIsOpen(true)}
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
}
