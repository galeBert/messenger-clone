'use client';
interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
}
import React, { useState } from 'react';
import Modal from '../Modal';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Input from '../inputs/Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from '../Button';

export default function SettingModal({
  isOpen,
  onClose,
  currentUser,
}: SettingModalProps) {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');
  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setisLoading(true);

    axios
      .post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error('something when wrong'))
      .finally(() => {
        setisLoading(false);
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-12'>
          <div className='border-b border-gray-900/10 pb-12'>
            <h2 className='text-base font-semibold leading-7 text-gray-800'>
              Profile
            </h2>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              Edit your public information
            </p>
            <div className='mt-10 flex flex-col gap-y-8'>
              <Input
                disabled={isLoading}
                label='Name'
                id='name'
                errors={errors}
                required
                register={register}
              />
              <div>
                <label className='block text-sm font-medium leading-6 text-gray-600'>
                  Photos
                </label>
                <div className='mt-2 flex items-center gap-x-3'>
                  <Image
                    width={48}
                    height={48}
                    className='rounded-full object-contain'
                    src={
                      image || currentUser?.image || '/images/placeholder.jpg'
                    }
                    alt='avatar'
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset='klxreblm'
                  >
                    <Button disabled={isLoading} secondary type='button'>
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Button disabled={isLoading} onClick={onClose} secondary>
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
