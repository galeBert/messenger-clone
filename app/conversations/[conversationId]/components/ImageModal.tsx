'use client';
import Modal from '@/app/components/Modal';
import Image from 'next/image';
import React from 'react';

interface ImageModalProps {
  src: string | null;
  isOpen: boolean;
  onClose: () => void;
}
export default function ImageModal({ onClose, src, isOpen }: ImageModalProps) {
  if (!src) {
    return null;  
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='w-80 h-80'>
        <Image alt='Iamge' className='object-cover' fill src={src} />
      </div>
    </Modal>
  );
}
