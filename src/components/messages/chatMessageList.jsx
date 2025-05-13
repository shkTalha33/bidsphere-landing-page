/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, Send } from "react-feather";
import ChatMessage from "./chatMessage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoVideocamOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  useActiveChat,
  useChatList,
  useChatUser,
  useResponsiveChat,
} from "./context";

import { getUserMessage } from "../api/ApiFile";
import ApiFunction from "../api/apiFuntions";
import { useSocket } from "../socketProvider/socketProvider";
import { avataruser } from "../assets/icons/icon";
import { Spinner } from "react-bootstrap";

const ChatMessageList = () => {
  const { baseURL, get, post } = ApiFunction();
  const router = useRouter();
  const dispatch = useDispatch();
  const [chatMsg, setChatMsg] = useState([]);
  const [usersId, setUsersId] = useState("");
  const [lastMsgId, setLastMsgId] = useState("");
  const userData = useSelector((state) => state.auth?.userData);

  const chatMessagesRef = useRef(null);
  const [lastId, setLastId] = useState(0);

  const [newMsg, setNewMsg] = useState(false);
  // const socketRef = useRef();
  const { setResponsiveChat } = useResponsiveChat();

  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  //// context APi
  const { chatUser } = useChatUser();
  const { activeChatId } = useActiveChat();
  const { chatListData, setChatListData } = useChatList();
  const socket = useSocket();

  useEffect(() => {
    setLastId(chatMsg[0]?._id);
  }, [chatMsg]);

  useEffect(() => {
    if (socket) {
      const handleMessage = (message) => {
        const isActiveChat = chatUser?.lot?._id === activeChatId;
        // if (message?.conversationId === chatUser?.lastMsg?.conversationId) {

        if (isActiveChat) {
          setChatMsg((prevChat) => [...prevChat, message]);
        }
        // }
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
        // add new chat message to the chat list
        setChatListData((prevData) => {
          const alreadyExists = prevData?.some(
            (item) => item?._id === message?.conversationId
          );
          if (!alreadyExists) {
            const newChatObj = {
              _id: message?.conversationId,
              lot: chatUser?.lot,
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
              unseen: 0,
            };
            return [newChatObj, ...prevData];
          }
          return prevData;
        });
      };

      socket.on("receive-message", handleMessage);
      return () => {
        socket.off("receive-message", handleMessage);
      };
    }
  }, [activeChatId, socket, userData?._id]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    const message = input.value;
    const data = {
      lot: chatUser?.lot?._id,
      message: message,
      type: "user",
    };
    if (message.trim() !== "") {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      await socket.emit("send-lot-message", data);
      input.value = "";
    }
  };

  const getUserChat = (userId) => {
    const apiChat = `${getUserMessage}/${userId}`;
    get(apiChat)
      .then((res) => {
        if (res?.success) {
          setNewMsg(true);
          setChatMsg([...res?.messages].reverse());
          setIsLoading3(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading3(false);
      })
      .finally(() => {
        setIsLoading3(false);
      });
  };

  useLayoutEffect(() => {
    handleChatClick(activeChatId);
  }, [activeChatId]);
  useEffect(() => {
    if (chatMsg?.length > 0) {
      if (lastId === 0) {
        chatMessagesRef.current.scrollTop =
          chatMessagesRef.current.scrollHeight;
      } else {
        if (newMsg) {
          chatMessagesRef.current.scrollTop =
            chatMessagesRef.current.scrollHeight;
          setNewMsg(true);
        }
      }
    }
  }, [chatMsg]);

  const handleScroll = async () => {
    if (chatMessagesRef.current.scrollTop === 0 && !isLoading3) {
      setNewMsg(false);
      setIsLoading2(true);
      const apiChat = `${getUserMessage}/${usersId}/${lastId}`;
      get(apiChat)
        .then((res) => {
          if (res?.success) {
            const data = [...res?.messages?.reverse(), ...chatMsg];
            setChatMsg(data);
            setIsLoading2(false);
          } else {
            setIsLoading2(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoading2(false);
        })
        .finally(() => {
          setIsLoading2(false);
        });
    } else setIsLoading2(false);
  };

  const handleChatClick = async (userId) => {
    setIsLoading3(true);
    getUserChat(userId);
    setUsersId(userId);
  };

  // const initiateCall = async (channel, token) => {
  //   try {
  //     const response = await post(
  //       createCall,
  //       {
  //         channel: channel,
  //         to_user: chatUser?.otherUser?._id,
  //       },
  //       header1
  //     );

  //     if (response?.message) {
  //       const videoCallData = {
  //         channel: channel,
  //         user: chatUser?.otherUser?._id,
  //       };

  //       // Set video call data in Redux store
  //       dispatch(setVideoCallData(videoCallData));

  //       // Determine route based on user type
  //       const redirectPath =
  //         userData?.user?.currentType === "service"
  //           ? `/service-provider/VideoCall?channel=${channel}&id=${chatUser?.otherUser?._id}`
  //           : `/customer/VideoCall?channel=${channel}&id=${chatUser?.otherUser?._id}`;

  //       router.push(redirectPath);
  //     } else {
  //       console.error("Call initiation failed. Response message is missing.");
  //       message.error("Error initiating the call. Please try again.");
  //     }
  //   } catch (error) {
  //     // Log the error details
  //     console.error("Error initiating the call:", error);
  //     message.error(error?.response?.data?.message);
  //   }
  // };

  // const createChannel = async () => {
  //   const generateRandomChannelName = (length) => {
  //     const characters =
  //       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //     let result = "";
  //     for (let i = 0; i < length; i++) {
  //       result += characters.charAt(
  //         Math.floor(Math.random() * characters.length)
  //       );
  //     }
  //     return result;
  //   };
  //   const channel = generateRandomChannelName(10);
  //   try {
  //     const response = await post("users/get-token", { channel }, header1);
  //     if (response?.token) {
  //       initiateCall(channel, response?.token);
  //     }
  //   } catch (error) {}
  // };

  return (
    <div className="chat_height position-relative">
      <div className="d-flex align-items-center bg_dark !rounded-t-[10px]">
        <div>
          <button
            className="d_left_button bg-dark"
            onClick={() => {
              setResponsiveChat(false);
            }}
          >
            <ChevronLeft />
          </button>
        </div>

        <div className="w-100 py-2 px-3 d-flex justify-content-between align-items-center">
          {isLoading3 ? (
            <div className="chatSkltonmain w-50 mt-3">
              <Skeleton className="chatSklten0" />
            </div>
          ) : (
            <>
              <div className="d-flex gap-1 algin-items-center">
                {chatUser?.lot?.images ? (
                  <>
                    <img
                      className="rounded-[50%] bg-white chatImg00"
                      src={chatUser?.lot?.images[0]}
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <Image
                      className="rounded-[50%] bg-white chatImg00"
                      src={avataruser}
                      alt=""
                    />
                  </>
                )}
                <div className="d-flex flex-column">
                  <>
                    <span className=" text_white text-sm regular_font fs_11">{`${
                      chatUser?.lot?.name
                        ? chatUser?.lot?.name
                        : userData?.lang === "en"
                        ? chatUser?.lot?.name?.en
                        : chatUser?.lot?.name?.ar
                    }`}</span>
                    <span className="regular_font text_white text-sm fs_08">
                      {chatUser?.lot?.active}
                    </span>
                  </>
                </div>
              </div>
            </>
          )}
        </div>
        {/* <div className="me-3">
          <button
            onClick={() => {
              if (videoCallData?.channel) {
                if (userData?.user?.currentType === "service") {
                  router.push(
                    `/service-provider/VideoCall?channel=${videoCallData.channel}&id=${activeChatId}`
                  );
                } else {
                  router.push(
                    `/customer/VideoCall?channel=${videoCallData.channel}&id=${activeChatId}`
                  );
                }
              } else {
                createChannel();
              }
            }}
            className="rounded-5 p-2 bg_white border hover:bg-gray-100 text-blue-400"
          >
            <IoVideocamOutline />
          </button>
        </div> */}
      </div>

      <div className="position-relative">
        <div
          ref={chatMessagesRef}
          onScroll={handleScroll}
          className="chat-messages scrolbar px-2 py-3"
        >
          {isLoading3 ? (
            <div className="text-center flex justify-center mt-10 w-100">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {isLoading2 && (
                <div className="text-center flex justify-center mt-10">
                  {" "}
                  <Spinner animation="border" role="status"></Spinner>
                </div>
              )}
              {chatMsg?.length > 0 &&
                chatMsg?.map((msg, index) => (
                  <Fragment key={index}>
                    <ChatMessage
                      left={userData?._id === (msg?.sender?._id || msg?.sender)}
                      message={msg?.message}
                      timestamp={`${msg?.createdAt}`}
                    />
                  </Fragment>
                ))}
            </>
          )}
        </div>
      </div>
      <form onSubmit={sendMessage} className="px-3">
        <div className="   w-100">
          <div className="d-flex my-3">
            <div className="position-relative hideFocus2  w-100 me-1">
              <input
                type="text"
                disabled={isLoading3}
                id="chatInput"
                required
                className="form-control rounded-3 ps-2 py-2 fs_10 "
                placeholder="Type your message.."
              />
            </div>
            <button
              disabled={isLoading3}
              className="send_btn rounded-3"
              type="submit"
            >
              <Send
                className="text-white p-0 m-0"
                style={{ width: "1.2rem" }}
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatMessageList;
