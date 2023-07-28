'use client';
import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import React, { useRef, useState } from 'react';
import MessageBox from './MessageBox';

interface BodyProps {
  initialMessages: FullMessageType[];
}
export default function Body({ initialMessages }: BodyProps) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { conversationId } = useConversation();
  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, idx) => {
        return (
          <MessageBox
            isLast={idx === messages.length - 1}
            key={message.id}
            data={message}
          />
        );
      })}
      <div ref={bottomRef} className='pt-24' />
    </div>
  );
}
