/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Dropdown, message } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Camera, ChevronLeft, File, Plus, Send, X } from "react-feather";
import { IoVideocamOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Input } from "reactstrap";
import axiosInstance from "../api/axiosInstance";
import { avataruser } from "../assets/icons/icon";
import { uploadFile } from "../redux/apiSlice2";
import { useSocket } from "../socketProvider/socketProvider";
import ChatMessage from "./chatMessage";
import { useActiveChat, useChatList, useChatUser, useResponsiveChat } from "./context";
// import { uploadDocument, uploadFile, uploadVideo } from "../ApiFunction/uploadImage";

const ChatMessageList = ({ socketRef }) => {
  const [chatMsg, setChatMsg] = useState([]);
  const router = useRouter()
  const [fileLoading, setFileLoading] = useState(false);
  const [fileLoading2, setFileLoading2] = useState(false);
  const [fileLoading3, setFileLoading3] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [documentUrl, setDocumentUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [postData, setPostData] = useState(null);
  const [type, setType] = useState('text');
  const chatMessagesRef = useRef(null);
  const userData = useSelector((state) => state?.auth?.userData)
  const [newMsg, setNewMsg] = useState(false);
  const { setResponsiveChat } = useResponsiveChat()
  const [isLoading3, setIsLoading3] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false);
  const searchParams = useSearchParams()
  //// context APi
  const { chatUser } = useChatUser()
  const { activeChatId } = useActiveChat()
  const { setChatListData } = useChatList();

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        console.log(message, 'socket message');

        // if (activeChatId === message?.sender || userData?._id === message?.sender) {
        setChatMsg((prevMessages) => {
          setNewMsg(true)
          const uniqueMessagesSet = new Set(prevMessages.map(JSON.stringify));
          if (!uniqueMessagesSet.has(JSON.stringify(message))) {
            const updatedMessages = [...prevMessages, message];
            return updatedMessages;
          }
          return prevMessages;
        });
        // }
      });
      socket.on("newConversation", (newConversation) => {
        console.log(newConversation);
        setChatListData((prevChatList) => {
          // Check if the new conversation already exists
          const conversationIndex = prevChatList.findIndex(
            (chat) => chat._id === newConversation._id
          );

          if (conversationIndex !== -1) {
            // If it exists, update the conversation
            const updatedChatList = [...prevChatList];
            updatedChatList[conversationIndex] = {
              ...updatedChatList[conversationIndex],
              ...newConversation,
            };
            return updatedChatList.sort((a, b) => {
              const dateA = new Date(a?.lastMsg?.createdAt || a.createdAt);
              const dateB = new Date(b?.lastMsg?.createdAt || b.createdAt);
              return dateB - dateA;
            });
          } else {
            // If it doesn't exist, add it to the list
            const updatedChatList = [...prevChatList, newConversation];
            return updatedChatList.sort((a, b) => {
              const dateA = new Date(a?.lastMsg?.createdAt || a.createdAt);
              const dateB = new Date(b?.lastMsg?.createdAt || b.createdAt);
              return dateB - dateA;
            });
          }
        });
      });
    }

    return () => {
      if (socket) {
        socket.off('message');
        socket.off('newConverstion');
      }
    }

  }, [activeChatId]);


  console.log(chatUser);

  const sendMessage = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const timestamp = Math.floor(currentDate.getTime() / 1000);
    const input = document.getElementById('chatInput');
    const message = input.value;
    const data = {
      to_id: chatUser?.otherUser?._id,
      timestamp: timestamp,
      message: type === 'text' ? message : type === 'image' ? imageUrl : type === 'video' ? videoUrl : type === 'doc' ? documentUrl : message,
      type: type
    }
    if (!socket) {
      console.error("Socket is not connected yet.");
      return;
    }
    // setChatMsg([...chatMsg, data]);
    // if (message.trim() !== '') {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    try {
      await socket.emit("clientSendMessage", data);
      input.value = '';
      handleClear()
    } catch (error) {
      console.error("Error sending message:", error);
    }
    // }
  };
  const [lastId, setLastId] = useState(0);
  const [count, setCount] = useState(0);

  const getUserChat = async (userId) => {
    await axiosInstance.get(`msg/messages/${userId}/0`)
      .then(async (result) => {
        if (result?.data?.success) {
          setNewMsg(true)
          setCount(result.data.count)
          setLastId(0)
          setChatMsg(result?.data?.messages?.reverse());
        }
        setIsLoading3(false)
      }).catch((err) => {
        console.log(err)
        setIsLoading3(false)
      });
  }
  const handleChatClick = async (userId) => {
    setIsLoading3(true)
    getUserChat(userId)
  };
  useLayoutEffect(() => {
    handleChatClick(activeChatId)
  }, [activeChatId]);
  useEffect(() => {
    if (chatMsg?.length > 0) {
      if (lastId === 0) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      } else {
        if (newMsg) {
          chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
          setNewMsg(true)
        }
      }
    }
  }, [chatMsg]);

  const handleScroll = async () => {
    if (chatMessagesRef.current.scrollTop === 0 && lastId + 30 < count && !isLoading3) {
      setNewMsg(false)
      setIsLoading2(true)
      await axiosInstance.get(`msg/messages/${activeChatId}/${lastId + 30}`)
        .then(async (result) => {
          if (result?.data?.success) {
            setLastId(lastId + 30)
            const data = [...result?.data?.messages?.reverse(), ...chatMsg]
            setChatMsg(data)
            setIsLoading2(false)
          }
          setIsLoading3(false)
        }).catch((err) => {
          console.log(err)
          setIsLoading3(false)
        });
    } else
      setIsLoading2(false)
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      setFileLoading(true);
      await uploadFile({ data: formData })
        .then((res) => {
          if (res) {
            setImageUrl(res.files[0])
            setType('image');
            setFileLoading(false);
          } else {
            message.error('Upload Again')
            setFileLoading(false);
            handleClear()
          }
        }).catch((err) => {
          message.error('Failed to upload file');
          setFileLoading(false);
        })
    }
  };

  const handleFileChange2 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('video', selectedFile);
      setFileLoading2(true);
      await uploadFile({ data: formData })
        .then((res) => {
          if (res) {
            setType('video');
            setVideoUrl(res.video)
            setFileLoading2(false);
          } else {
            message.error('Upload Again')
            setFileLoading2(false);
            handleClear()
          }
        }).catch((err) => {
          message.error('Failed to upload file');
          setFileLoading2(false);
        })
    }
  };

  const handleFileChange3 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      setFileLoading3(true);
      await uploadFile({ data: formData })
        .then((res) => {
          if (res) {
            setType('doc');
            setDocumentUrl(res.file)
            setFileLoading3(false);
          } else {
            message.error('Upload Again')
            setFileLoading3(false);
            handleClear()
          }
        }).catch((err) => {
          message.error('Failed to upload file');
          setFileLoading3(false);
        })
    }
  };

  const handleClear = () => {
    setImageUrl('');
    setVideoUrl('');
    setDocumentUrl('');
    setType('text');
  };

  const items1 = [
    {
      label: <button type="button" className="w-full">
        <label htmlFor={`fileInput1`} style={{ cursor: "pointer" }} className="cursor-pointer w-full">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Preview"
              style={{ height: "100px", objectFit: "cover" }}
              className="rounded-4 w-full bg_light object-cover"
            />
          ) : (
            <div className="rounded-4 w-full text_black relative flex gap-2 justify-start items-center">
              <Camera size={16} />
              <span className="popins_medium text-xs">Upload Image</span>
            </div>
          )}
        </label>
        <Input
          type="file"
          id={`fileInput1`}
          accept="image/*"
          className="visually-hidden"
          onChange={handleFileChange}
        />
      </button>,
      key: '0',
    },
    {
      label: <button type="button" className="w-full">
        <label style={{ cursor: "pointer" }} htmlFor={`fileInput2`} className="cursor-pointer w-full">
          {videoUrl ? (
            <video
              src={videoUrl}
              alt="Preview"
              style={{ height: "100px", objectFit: "cover" }}
              className="rounded-4 w-full bg_light object-cover"
              controls
            />
          ) : (
            <div className="rounded-4 w-full text_black relative flex gap-2 justify-start items-center">
              <IoVideocamOutline size={18} />
              <span className="popins_medium text-xs">Upload Video</span>
            </div>
          )}
        </label>
        <Input
          type="file"
          id={`fileInput2`}
          accept="video/*"
          className="visually-hidden"
          onChange={handleFileChange2}
        />
      </button>,
      key: '1',
    },
    {
      label:
        <button type="button" className="w-full">
          <label style={{ cursor: "pointer" }} htmlFor={`fileInput3`} className="cursor-pointer w-full">
            {documentUrl ? (
              <a href={documentUrl} target="__blank" className="text_black popins_medium text-xs hover:underline">{documentUrl}</a>
            ) : (
              <div className="rounded-4 w-full text_black relative flex gap-2 justify-start items-center">
                <File size={16} />
                <span className="popins_medium text-xs">Upload Document</span>
              </div>
            )}
          </label>
          <Input
            type="file"
            id={`fileInput3`}
            accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
            className="visually-hidden"
            onChange={handleFileChange3}
          />
        </button>,
      key: '2',
    },
  ]

  return (
    <div className="chat_height overflow-hidden position-relative">
      <div className="d-flex align-items-center py-2 max-md:mt-[3rem] border-b border-b-gray-200">
        <div>
          <button
            className="d_left_button"
            onClick={() => {
              setResponsiveChat(false);
            }}>
            <ChevronLeft />
          </button>
        </div>
        <div className="w-100 py-2 px-3 d-flex justify-content-between align-items-center">
          <div className="d-flex gap-1 algin-items-center">
            {/* <Image src={chatUser?.otherUser?.profilePicture ? global.BASEURL + "/" + chatUser?.otherUser?.profilePicture : profile} className="rounded-circle bg-white" alt=""
              style={{ height: '48px', width: "48px", objectFit: "cover" }}
              /> */}
            <Image src={(chatUser?.otherUser?.profile_image || chatUser?.otherUser?.brand?.logo) || avataruser} width={50} height={50} alt="" className="chat_profile_img" />
            <div className="d-flex  flex-column">
              <span className=" text_black popins_medium">{`${(chatUser?.otherUser?.influencer?.name || chatUser?.otherUser?.brand?.name) || ''}`}</span>
              <span className="popins_regular text_black text-sm ">{chatUser?.otherUser?.email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="position-relative">
        <div ref={chatMessagesRef} onScroll={handleScroll} className="chat-messages scrolbar">
          {/* {postData ?
            <div style={{ zIndex: 99 }} className="flex gap-3 bg_white justify-between items-center w-full p-3 mb-2 sticky top-0 shadow-md">
              <div className="flex gap-2 items-center w-full">
                <Image height={60} width={60} src={postData?.post?.images[0]} alt="" className="rounded-md object-cover" style={{ height: '3.5rem', width: '3.5rem' }} />
                <div className="flex flex-col">
                  <h6 className="popins_semibold">{postData?.post?.title} </h6>
                  <span className="text-muted popins_medium">${postData?.post?.price || 0} </span>
                </div>
              </div>
              <div>
                <button
                  className="bg_primary whitespace-nowrap text_white rounded-3 py-2 px-4 popins_medium"
                  onClick={() => router.push(`/all-products/${postData?.post?._id}`)}
                >
                  View Ad
                </button>
              </div>
            </div> : null} */}
          {isLoading3 ? (
            <div className="text-center w-100">
              <Spinner
                style={{
                  width: "20px",
                  height: "20px",
                  marginTop: "3px",
                  borderWidth: "0.15em",
                }}
                animation="border"
                role="status"
              >
                <span className="popins_regular visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="px-2">
              {isLoading2 && <div className="text-center">   <Spinner
                style={{
                  width: "20px",
                  height: "20px",
                  marginTop: "3px",
                  borderWidth: "0.15em",
                }}
                animation="border"
                role="status"
              >
              </Spinner></div>}
              {chatMsg?.length > 0 && chatMsg?.map((msg, index) => (
                <Fragment key={index} >
                  <ChatMessage
                    data={msg}
                    left={userData?._id === msg?.sender ? false : true}
                    message={msg?.message}
                    type={msg?.type}
                    timestamp={`${msg?.timestamp}`}
                  />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
      <form onSubmit={sendMessage} className="px-3">
        <div className="flex w-full justify-end items-end">
          {fileLoading || fileLoading2 || fileLoading3 ? (
            <div className="loader">
              <div className="p-4 flex justify-center items-center w-full">
                <Spinner size="sm" className="text_primary" />
              </div>
            </div>
          ) : type === 'image' ? (
            <div className=' relative selected_img bg-[#f4f4f4] rounded-3'>
              <img src={imageUrl} alt="Selected" className="w-100 rounded-3 h-100" />
              <button className="absolute -top-2 -right-2 bg_light p-1 rounded-full" onClick={handleClear}>
                <X />
              </button>
            </div>
          ) : type === 'video' ? (
            <div className='relative selected_img bg-[#f4f4f4] rounded-3'>
              <video src={videoUrl} controls className="w-100 rounded-3 h-100" />
              <button className="absolute -top-2 -right-2 bg_light p-1 rounded-full" onClick={handleClear}>
                <X />
              </button>
            </div>
          ) : type === 'doc' ? (
            <div className="position-relative">
              <a href={documentUrl} target="__blank" className="text-black popins_regular">
                {documentUrl}
              </a>
              <button className="absolute -top-2 -right-2 bg_light p-1 rounded-full" onClick={handleClear}>
                <X />
              </button>
            </div>
          ) : ''}
        </div>
        <div className="w-100">
          <div className="d-flex gap-2 mt-4">
            <Dropdown
              menu={{
                items: items1,
              }}
              trigger={['click']}
            >
              <button type="button" className="btn btn-light">
                <Plus size={18} />
              </button>
            </Dropdown>
            <div className="position-relative w-100">
              <input
                type="text"
                style={{ padding: "10px" }}
                disabled={isLoading3 || imageUrl || videoUrl || documentUrl}
                id="chatInput"
                required
                className="form-control rounded-2 text-xs popins_regular ps-3"
                placeholder="Send Message..."
              />
            </div>
            <button
              disabled={isLoading3 || fileLoading || fileLoading2 || fileLoading3}
              className="rounded-1 py-[6px] h-fit px-[12px] bg_primary"
              type="submit"
            >
              <Send className="text-white p-0 m-0" style={{ width: "1rem" }} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatMessageList;