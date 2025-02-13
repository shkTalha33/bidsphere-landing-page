// context.js
import React, { createContext, useContext, useState } from 'react';

const ChatList = createContext();
const ActiveChat = createContext();
const ChatUser = createContext();
const ResponsiveChat = createContext();

export const ChatProvider = ({ children }) => {
  const [chatListData, setData] = useState([]);

  const setChatListData = (newData) => {
    setData(newData);
  };

  return (
    <ChatList.Provider value={{ chatListData, setChatListData }}>
      {children}
    </ChatList.Provider>
  );
};
export const ActiveChatProvider = ({ children }) => {
  const [activeChatId, setData] = useState(null);

  const setActiveChatId = (newData) => {
    setData(newData);
  };

  return (
    <ActiveChat.Provider value={{ activeChatId, setActiveChatId }}>
      {children}
    </ActiveChat.Provider>
  );
};
export const ChatUserProvider = ({ children }) => {
  const [chatUser, setData] = useState(null);

  const setChatUser = (newData) => {
    setData(newData);
  };

  return (
    <ChatUser.Provider value={{ chatUser, setChatUser }}>
      {children}
    </ChatUser.Provider>
  );
};
export const ResponsiveChatProvider = ({ children }) => {
  const [responsiveChat, setData] = useState(false);

  const setResponsiveChat = (newData) => {
    setData(newData);
  };

  return (
    <ResponsiveChat.Provider value={{ responsiveChat, setResponsiveChat }}>
      {children}
    </ResponsiveChat.Provider>
  );
};


export const useChatList = () => {
  const context = useContext(ChatList);
  if (!context) {
    throw new Error('useMyContext must be used within a Chat Provider');
  }
  return context;
};
export const useActiveChat = () => {
  const context = useContext(ActiveChat);
  if (!context) {
    throw new Error('useMyContext must be used within a ActiveChat Provider');
  }
  return context;
};
export const useChatUser = () => {
  const context = useContext(ChatUser);
  if (!context) {
    throw new Error('useMyContext must be used within a ChatUser Provider');
  }
  return context;
};
export const useResponsiveChat = () => {
  const context = useContext(ResponsiveChat);
  if (!context) {
    throw new Error('useMyContext must be used within a responsive chat Provider');
  }
  return context;
};
