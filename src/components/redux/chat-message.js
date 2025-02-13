import { createSlice } from '@reduxjs/toolkit';

export const ChatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatList: [],
    messageList: [],
    notificationData: 0,
    notificationCount: 0,
    conversationCount: 0,
    activeChatId: null,
    activeUser: null,
    responsiveChat: false,
  },
  reducers: {
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
    setNotificationData: (state, action) => {
      state.notificationData = action.payload;
    },
    setNotificationCount: (state, action) => {
      state.notificationCount = action.payload;
    },
    setConversationCount: (state, action) => {
      state.conversationCount = action.payload;
    },
    setMessageList: (state, action) => {
      state.messageList = action.payload;
    },
    setActiveChatId: (state, action) => {
      state.activeChatId = action.payload;
    },
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
    setResponsiveChat: (state, action) => {
      state.responsiveChat = action.payload;
    },
  },
});

export const { setChatList, setNotificationData, setMessageList, setConversationCount, setNotificationCount, notificationCount, setActiveChatId, setResponsiveChat, setActiveUser } = ChatSlice.actions;

export default ChatSlice.reducer;