import { useAppStore } from '@/store'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import EmptyChatContainer from './components/empty-chat-container';
import ChatContainer from './components/chat-container';
import ContactsContainer from './components/contacts-container';

function Chat() {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && !userInfo.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  } , [userInfo]);

  return (
    <div className='flex h-[100vh] text-white overflow-hidden font-pacifico'>
      <ContactsContainer />
      {/* <EmptyChatContainer /> */}
      <ChatContainer />
    </div>
  )
}

export default Chat
