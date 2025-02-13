/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";
import axiosInstance from "../api/axiosInstance";
import { useSocket } from "../socketProvider/socketProvider";
import { useActiveChat, useChatList, useChatUser, useResponsiveChat } from "./context";
import { avataruser } from "../assets/icons/icon";
import UserLoader from "../common/UserLoader";

const ChatUsers = ({ name, discrip, img, id, timestamp, type, loading, status, data, conversationId }) => {
  const [badge, setBadge] = useState(false);
  const userData = useSelector((state) => state?.auth?.userData)
  const { activeChatId, setActiveChatId } = useActiveChat()
  const { setChatUser } = useChatUser()
  const { setResponsiveChat } = useResponsiveChat()
  const { replace } = useRouter();
  const pathname = usePathname()
  const socket = useSocket()
  const searchParams = useSearchParams()

  const handleDeleteParams = () => {
    const param = new URLSearchParams(searchParams)
    const nData = param.get('detail-user')
    if (nData) {
      param.delete('detail-user')
      replace(`${pathname}`);
    }
  }

  const toggleData = async (chatData) => {
    setChatUser(chatData)
    setResponsiveChat(true)
    setActiveChatId(chatData?.otherUser?._id); // Set the active chat ID
    if (socket) {
      socket.emit('seen-msg', { conversationId })
    }
  };
  const isActive = id === activeChatId;
  useEffect(() => {
    if (isActive) {
      toggleData(data)
    }
  }, [activeChatId, isActive])
  useEffect(() => {
    setBadge(((data?.lastMsg?.sender !== userData?._id) && data?.lastMsg?.seen === false))
  }, [data]);

  return (
    <>
      {loading ?
        <div className="w-full my-4 text-center flex justify-center items-center">
          <HashLoader size={18} className='text_primary' />
        </div> :
        <div
          className={`_link_  border-0 `}
          style={{ cursor: "pointer" }}
          onClick={() => {
            toggleData(data)
            handleDeleteParams()
          }}
        >
          <div
            className={`d-flex align-items-center chat-list-link border-b border-b-[#E5E9EB] px-3 py-[14px] w-100 ${isActive ? "active" : ""
              }`}
          >
            <div className={`${status ? "status_div00" : ""}`}>
              <div className="position-relative" style={{ minWidth: '45px' }}>
                <Image src={img || avataruser} alt="" width={45} height={45} className="chat_profile_img" />
                <span>
                  <span
                    className={`noti_badges popins_regular text-xs ${badge && 'd-block'}`}
                    id="chatbadge"
                  >
                  </span>
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center w-100 pe-1">
              <div className="ps-3 mt-1">
                <h4 className="my-0 chat_name00 text-sm line-clamp-1 popins_regular">{name}</h4>
                <div className="chat_detail00 text-xs popins_regular line-clamp-1">{type === 'text' ? discrip : type === 'video' ? 'Video' : 'File'}</div>
              </div>
              <div className="time_div00">
                <h6 className="chat_detail00 text-xs popins_regular line-clamp-1" style={{ whiteSpace: "nowrap" }}>
                  <Moment unix fromNow className="popins_medium">
                    {timestamp}
                  </Moment>
                </h6>
              </div>
            </div>
          </div>
        </div>}
    </>
  );
};

const ChatList = () => {
  const { chatListData, setChatListData } = useChatList();
  const chatContainerRef = useRef(null);
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [lastId, setLastId] = useState(0);


  const handleChatList = async (id) => {
    setloading(true); // Start loading
    try {
      const result = await axiosInstance.get(`msg/conversations`);
      if (result?.data?.success) {
        setCount(result.data.count);
        setChatListData(
          result?.data?.conversations?.sort((a, b) => {
            const lastMsgA = a?.lastMsg;
            const lastMsgB = b?.lastMsg;
            if (!lastMsgA || !lastMsgB) {
              return 0;
            }
            const createdAtA = new Date(lastMsgA.createdAt);
            const createdAtB = new Date(lastMsgB.createdAt);
            return createdAtB - createdAtA;
          })
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setloading(false);
    }
  };

  async function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = chatContainerRef.current;
    if (lastId <= count) {
      if (Math.ceil(scrollHeight - scrollTop) - 1 < clientHeight) {
        try {
          setloading(true);
          const result = await axiosInstance.get(`msg/conversations/${lastId + 10}`);
          if (result?.data?.success) {
            setLastId(lastId + 10);
            const newConversations = result?.data?.conversations.filter(
              (conversation) => !chatListData.find((chat) => chat._id === conversation._id)
            );
            setChatListData((prevChatList) => [
              ...prevChatList,
              ...newConversations,
            ].sort((a, b) => {
              const lastMsgA = a?.lastMsg;
              const lastMsgB = b?.lastMsg;
              if (!lastMsgA || !lastMsgB) {
                return 0;
              }
              const createdAtA = new Date(lastMsgA.createdAt);
              const createdAtB = new Date(lastMsgB.createdAt);
              return createdAtB - createdAtA;
            }));
          }
        } catch (err) {
          console.log(err);
        } finally {
          setloading(false);
        }
      }
    }
  }

  useEffect(() => {
    handleChatList(0);
  }, []);

  return (
    <>
      <Suspense>
        <div className="chat_height_contol scrolbar" ref={chatContainerRef} onScroll={handleScroll}>
          {loading && chatListData.length === 0 && (
            <UserLoader />
          )}
          {!loading && chatListData.length === 0 && (
            <div className="w-full my-5 text-center">
              <p className="popins_medium text_primary">No chats found</p>
            </div>
          )}
          {chatListData?.length > 0 &&
            chatListData.map((chat) => (
              <Fragment key={chat?._id}>
                <ChatUsers
                  id={chat?.otherUser?._id}
                  img={(chat?.otherUser?.profile_image || chat?.otherUser?.brand?.logo) || avataruser}
                  loading={loading}
                  data={chat}
                  conversationId={chat?._id}
                  type={chat?.lastMsg?.type}
                  name={`${(chat?.otherUser?.influencer?.name || chat?.otherUser?.brand?.name || '')}`}
                  discrip={chat?.lastMsg?.message}
                  timestamp={chat?.lastMsg?.timestamp}
                />
              </Fragment>
            ))}
          {loading && chatListData.length > 0 && (
            <div className="w-full my-4 text-center">
              <HashLoader size={18} className='text_primary' animation="border" />
            </div>
          )}
        </div>
      </Suspense>
    </>
  );
};

export default ChatList;