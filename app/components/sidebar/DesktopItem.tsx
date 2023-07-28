'use client';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}
export default function DesktopItem({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: DesktopItemProps) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <li onClick={handleClick}>
      <Link
        className={clsx(
          'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100',
        )}
        href={href}
      >
        <Icon className='h-6 w-6 shrink-0' />
        <span className='sr-only'>{label}</span>
      </Link>
    </li>
  );
}
