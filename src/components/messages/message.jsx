/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
"use client"
import { Col } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { ChevronLeft, Search } from "react-feather";
import { BiSolidMessageRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useSocket } from "../socketProvider/socketProvider";
import "./chat.css";
import ChatList from "./chatList";
import ChatMessageList from "./chatMessageList";
import { ActiveChatProvider, ChatProvider, ChatUserProvider, ResponsiveChatProvider, useActiveChat, useChatList, useChatUser, useResponsiveChat } from './context';

const ChatMessage = () => {
  const location = usePathname()
  const activeUser = useSelector((state) => state.chat?.activeUser)
  const { setChatListData } = useChatList();
  const searchParams = useSearchParams()
  const [active, setactive] = useState('buyer')
  const { activeChatId, setActiveChatId } = useActiveChat()
  const { setChatUser } = useChatUser()
  const { responsiveChat, setResponsiveChat } = useResponsiveChat()
  const socketRef = useRef();
  const socket = useSocket();
  const router = useRouter()

  const cleanupSocket = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("newConverstion", (newConversation) => {
        setChatListData(prevChatList => {
          const conversationIndex = prevChatList.findIndex(chat => chat._id === newConversation._id);

          // If the conversation already exists, replace it with the new conversation
          if (conversationIndex !== -1) {
            const updatedChatList = [...prevChatList];
            updatedChatList[conversationIndex] = newConversation;
            // Sort the updated chat list
            return updatedChatList.sort((a, b) => {
              const lastMsgA = a?.lastMsg;
              const lastMsgB = b?.lastMsg;
              if (!lastMsgA || !lastMsgB) {
                return 0;
              }
              const createdAtA = new Date(lastMsgA.createdAt);
              const createdAtB = new Date(lastMsgB.createdAt);
              return createdAtB - createdAtA; // Sort in descending order for newest first
            });
          } else {
            // If the conversation doesn't exist, add it to the chat list and sort
            const updatedChatList = [...prevChatList, newConversation].sort((a, b) => {
              const lastMsgA = a?.lastMsg;
              const lastMsgB = b?.lastMsg;
              if (!lastMsgA || !lastMsgB) {
                return 0;
              }
              const createdAtA = new Date(lastMsgA.createdAt);
              const createdAtB = new Date(lastMsgB.createdAt);
              return createdAtB - createdAtA; // Sort in descending order for newest first
            });
            return updatedChatList;
          }
        });
      });
    }
    return () => {
      if (socket) {
        socket.off('newConverstion'); // Cleanup the event listener
      }
    };
  }, [location]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    const nData = params.get('detail-user')
    // if (nData) {
    setActiveChatId(activeUser?._id)
    setResponsiveChat(true)
    setChatUser({
      otherUser: { ...activeUser, brand: activeUser?.brand, email: activeUser?.email }
    });


    // }
  }, [location]);

  return (
    <>
      <main className='md:container flex justify-center pt-5 pb-4 mx-auto'>
        <Col xs={24} xl={22}>
          <div className="chat_grid">
            <div className={`chat_screen overflow-hidden ${!responsiveChat ? "" : "d_chat_none"}`}>
              <div className="pb-1">
                <div className="flex items-center justify-between px-3">
                </div>
                <div className="w-100 py-3 px-2 border-b border-b-gray-200 gap-1 flex bg_white">
                  <button
                    onClick={() => router.back()}
                    className="d_left_button"
                  >
                    <ChevronLeft />
                  </button>
                  <div className="position-relative w-full">
                    <span className="position-absolute mt-[10px] ms-2"> <Search style={{ color: "#d3d3d3" }} size={20} /> </span>
                    <input type="text" placeholder="Search" className="py-[10px] form-control popins_regular text-sm border rounded-3 ps-[2rem] w-100" name="" id="" />
                  </div>
                </div>
                <hr style={{ color: "#EDEEF0" }} className="my-1" />
                <ChatList />
              </div>
            </div>
            <div
              className={`chat_screen ${responsiveChat ? "" : "d_chat_none"} `}
              id="chatScreen">
              {activeChatId ? (
                <ChatMessageList />
              ) : (
                <div className="display_flex2 flex-column h-100 w-100">
                  <BiSolidMessageRounded style={{ fontSize: "30px" }} />
                  <h4 className="ms-2 my-0 msg_s00">Select a message</h4>
                  <h6
                    style={{ color: "#2D3D38" }}
                    className="text-center popins_regular mt-2"
                  >
                    Choose from your existing conversations, start a new one,
                    or just keep swimming.
                  </h6>
                </div>
              )}
            </div>
          </div>
        </Col>
      </main>
    </>
  );
};


const Messages = () => {
  return (
    <>
      <Suspense>
        <ChatProvider>
          <ActiveChatProvider>
            <ChatUserProvider>
              <ResponsiveChatProvider>
                <ChatMessage />
              </ResponsiveChatProvider>
            </ChatUserProvider>
          </ActiveChatProvider>
        </ChatProvider>
      </Suspense>
    </>
  )
}

export default Messages