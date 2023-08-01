'use client';
import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';

interface BodyProps {
  initialMessages: FullMessageType[];
}
export default function Body({ initialMessages }: BodyProps) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);
  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((prev) => {
        if (find(prev, { id: message.id })) {
          return prev;
        }
        return [...prev, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            newMessage;
          }
          return currentMessage;
        }),
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('messages:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);

      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('messages:update', updateMessageHandler);
    };
  }, [conversationId]);

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
