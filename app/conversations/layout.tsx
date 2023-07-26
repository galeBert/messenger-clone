import React, { ReactNode } from 'react';
import getConversations from '../actions/getConversations';
import Sidebar from '../components/sidebar/Sidebar';
import ConversationList from './components/ConversationList';

export default async function layout({ children }: { children: ReactNode }) {
  const conversations = await getConversations();
  return (
    // @ts-expect-error
    <Sidebar>
      <div className='h-full'>
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}
