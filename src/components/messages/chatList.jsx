/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Moment from "react-moment";

import { useDispatch, useSelector } from "react-redux";
import {
  useActiveChat,
  useChatList,
  useChatUser,
  useResponsiveChat,
} from "./context";

import Image from "next/image";
import { getAllConversation } from "../api/ApiFile";
import ApiFunction from "../api/apiFuntions";
import { useSocket } from "../socketProvider/socketProvider";
import { avataruser, StaticImage } from "../assets/icons/icon";
import { Spinner } from "react-bootstrap";
import { Skeleton } from "antd";
import { decrementMessageUnseen } from "../redux/notificationSlice/notificationSlice";
import { useTranslation } from "react-i18next";

const ChatUsers = ({ name, discrip, img, id, timestamp, status, data }) => {
  const { t } = useTranslation();
  const [badge, setBadge] = useState(false);
  const { activeChatId, setActiveChatId } = useActiveChat();
  const { chatListData, setChatListData } = useChatList();
  const { setChatUser } = useChatUser();
  const { setResponsiveChat } = useResponsiveChat();
  const userData = useSelector((state) => state.auth?.userData);
  const dispatch = useDispatch();
  const toggleData = async (chatData) => {
    socket.emit("seen-msg", {
      lot: chatData?.lot?._id,
      type: "user",
    });
    const unseenToRemove = chatData?.unseen || 0;
    if (unseenToRemove > 0) {
      dispatch(decrementMessageUnseen(unseenToRemove));
    }
    setChatListData((prevData) =>
      prevData?.map((item) =>
        item?._id === chatData?._id ? { ...item, unseen: 0 } : item
      )
    );

    setChatUser(chatData);
    setResponsiveChat(true);
    setActiveChatId(chatData?.lot?._id);
    HandleSeenMessage(chatData?.lot?._id);
  };

  // seen message api start
  const socket = useSocket();
  const HandleSeenMessage = (userId) => {
    // const apiSeen = `${seenMessage}/${userId}`;
    // const newSocket = io(baseURL);
    // newSocket.on("connect", async () => {
    //   const token = userData?.token;
    //   // Authenticate with the server using the provided JWT token
    //   newSocket.emit("authenticate", token);
    // });
    // newSocket.on("authenticated", (userId) => {
    //   setSocket(newSocket);
    // });
    // newSocket.on("seen-msg", (notification) => {
    //   // dispatch(userChat(notification));
    // });
    // newSocket.on("send_message_error", (error) => {
    // });
    // return () => {
    //   newSocket.disconnect();
    // };
  };

  // seen message api ended

  const isActive = id === activeChatId;
  useEffect(() => {
    if (isActive) {
      toggleData(data);
    }
  }, [activeChatId, isActive]);
  useEffect(() => {
    setBadge(
      data?.lastMsg?.sender !== userData?._id && data?.lastMsg?.seen === false
    );
  }, [data]);

  return (
    <>
      <div
        className={`_link_  border-0 `}
        style={{ cursor: "pointer" }}
        onClick={() => toggleData(data)}
      >
        <div
          className={`d-flex align-items-center chat-list-link border-b-2 border-b-[#E5E9EB] px-3 py-3 w-100 ${
            isActive ? "active" : ""
          }`}
        >
          <div>
            <div className={`${status ? "status_div00" : ""}`}>
              <div className="position-relative">
                <div className="chat_profile_img rounded-[50%]">
                  {img ? (
                    <>
                      <img
                        src={img}
                        alt=""
                        className="w-[100%] h-[100%] rounded-[50%]"
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        src={avataruser}
                        alt=""
                        className="w-[100%] h-[100%] rounded-[50%]"
                      />
                    </>
                  )}
                </div>
                <span>
                  <span
                    className={`noti_badges fs_06 ${badge && "d-block"}`}
                    id="chatbadge"
                  ></span>
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center w-100 pe-1">
            <div className="ps-3 mt-1">
              <h4 className="my-0 medium_font text-[0.9rem] mb-2 line-clamp-1">
                {name}
              </h4>
              <div className="chat_detail00 regular_font text-[1rem] line-clamp-1">
                {discrip}
              </div>
            </div>
            <div className="time_div00">
              <h6
                className="chat_detail00 regular_font line-clamp-1"
                style={{ whiteSpace: "nowrap" }}
              >
                <Moment fromNow>{timestamp}</Moment>
              </h6>
            </div>
          </div>
          {data?.unseen > 0 && (
            <div className="poppins_light text-[0.8rem] text-danger">
              <span>{data?.unseen}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const ChatList = () => {
  const { t } = useTranslation();
  const { chatListData, setChatListData } = useChatList();
  const chatContainerRef = useRef(null);
  const [count, setCount] = useState(0);
  const [lastId, setLastId] = useState(0);
  const hasFetchedChatList = useRef(false);
  const { activeChatId, setActiveChatId } = useActiveChat();
  const { get, header1, userData } = ApiFunction();
  const { chatUser, setChatUser } = useChatUser();
  const [listLoading, setListLoading] = useState(false);

  const socket = useSocket();
  // get all conversatioin api start

  useEffect(() => {
    if (!socket) return;
    if (!chatUser) {
      const handleNewConversation = (message) => {
        setChatListData((prevChatList) => {
          let updatedChatList = prevChatList?.map((conversation) => {
            if (conversation?._id === message?.conversationId) {
              return {
                ...conversation,
                lastMsg: message,
              };
            }
            return conversation;
          });

          return updatedChatList.sort((a, b) => {
            const lastMsgA = a?.lastMsg?.createdAt;
            const lastMsgB = b?.lastMsg?.createdAt;
            return new Date(lastMsgB) - new Date(lastMsgA);
          });
        });
        setChatListData((prevData) => {
          const alreadyExists = prevData?.some(
            (item) => item?._id === message?.conversationId
          );
          if (!alreadyExists) {
            const newChatObj = {
              _id: message?.conversationId,
              lot: message?.lot,
              createdAt: message?.createdAt,
              updateAt: message?.createdAt,
              lastMsg: {
                _id: message?._id,
                sender: message?.sender,
                conversationId: message?.conversationId,
                message: message?.message,
                deleted_by: message?.deleted_by,
                seen: message?.seen,
                createdAt: message?.createdAt,
                __v: message?.__v,
              },
              otherUser: message?.sender,
              unseen: 1,
            };

            setActiveChatId(message?.lot?._id);

            // Add the new object at the start
            return [newChatObj, ...prevData];
          }
          return prevData;
        });
      };
      socket.on("receive-message", handleNewConversation);
      return () => {
        socket.off("receive-message", handleNewConversation);
      };
    }
  }, [socket]);

  const handleChatList = async (id) => {
    setListLoading(true);
    const getConversation = getAllConversation;
    await get(getConversation)
      .then((result) => {
        if (result?.success) {
          setListLoading(false);
          if (result?.conversations?.length > 0) {
            setChatListData(
              result?.conversations?.sort((a, b) => {
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
          } else {
            setChatListData([]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setListLoading(false);
      })
      .finally(() => {
        setListLoading(false);
      });
  };

  // get all conversatioin api ended

  async function handleScroll() {
    const { scrollTop, clientHeight, scrollHeight } = chatContainerRef.current;
    if (lastId <= count) {
      if (Math.ceil(scrollHeight - scrollTop) - 1 < clientHeight) {
        try {
          // const result = await getChatList(lastId + 10);
          // if (result?.data?.success) {
          //   setLastId(lastId + 10);
          //   const newConversations = result?.data?.conversations.filter(conversation => (
          //     !chatListData.find(chat => chat._id === conversation._id)
          //   ));
          //   // Combine filtered new data with previous chatList
          //   setChatListData(prevChatList => [
          //     ...prevChatList,
          //     ...newConversations
          //   ].sort((a, b) => {
          //     const lastMsgA = a?.lastMsg;
          //     const lastMsgB = b?.lastMsg;
          //     if (!lastMsgA || !lastMsgB) {
          //       return 0;
          //     }
          //     const createdAtA = new Date(lastMsgA.createdAt);
          //     const createdAtB = new Date(lastMsgB.createdAt);
          //     return createdAtB - createdAtA; // Sort in ascending order for oldest first
          //   }));
          // }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  useEffect(() => {
    if (!hasFetchedChatList.current && chatListData?.length === 0) {
      handleChatList();
      hasFetchedChatList.current = true;
    }
  }, [chatListData]);

  return (
    <>
      <>
        {listLoading ? (
          <>
            <div className="flex justify-center p-3 mt-3">
              <Skeleton active={true} className="w-full h-10" />
            </div>
          </>
        ) : (
          <>
            <div
              className="chat_height_contol scrolbar"
              ref={chatContainerRef}
              onScroll={handleScroll}
            >
              {chatListData?.length > 0 ? (
                chatListData?.map((chat, index) => (
                  <Fragment key={chat?._id}>
                    <ChatUsers
                      id={chat?.lot?._id}
                      img={chat?.lot?.images[0] || ""}
                      data={chat}
                      name={`${chat?.lot?.name}`}
                      discrip={chat?.lastMsg?.message}
                      timestamp={chat?.lastMsg?.createdAt}
                    />
                  </Fragment>
                ))
              ) : (
                <>
                  <div className="flex justify-center flex-col items-center gap-1 p-3 mt-3">
                    <Image
                      src={StaticImage}
                      className="w-[4rem] h-[4rem]"
                      alt=""
                    />
                    <h1 className="text-center text-gray-500">
                      {t("message.heading3")}
                    </h1>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </>
    </>
  );
};

export default ChatList;
