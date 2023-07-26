import getCurrentUser from '@/app/actions/getCurrentUser';
import React from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileFooter from './MobileFooter';

export default async function Sidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <div className='h-full'>
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className='lg:pl-20 h-full'>{children}</main>
    </div>
  );
}