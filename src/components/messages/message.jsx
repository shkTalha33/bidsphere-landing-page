/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";
import React, { Fragment, Suspense, useEffect, useRef } from "react";
import "./chat.css";
import ChatList from "./chatList";
import ChatMessageList from "./chatMessageList";
import { BiSolidMessageRounded } from "react-icons/bi";
import {
  ActiveChatProvider,
  ChatProvider,
  ChatUserProvider,
  ResponsiveChatProvider,
  useActiveChat,
  useChatList,
  useChatUser,
  useResponsiveChat,
} from "./context";
import axios from "axios";
import { io } from "socket.io-client";
// import { getChatList } from "../../api/message_api";
import { Search } from "react-feather";
import { useTranslation } from "react-i18next";

import { useRouter, useSearchParams } from "next/navigation";

import { useSocket } from "../socketProvider/socketProvider";
import { decryptData } from "../api/encrypted";
import ApiFunction from "../api/apiFuntions";
import { Container } from "reactstrap";
import { getLanguage } from "../redux/language/languageSlice";
import { useSelector } from "react-redux";

const ChatMessage = () => {
  const { userData, baseURL } = ApiFunction();
  const { updateChatList } = useChatList();
  const { chatUser, setChatUser } = useChatUser();
  const router = useRouter();
  const { activeChatId, setActiveChatId } = useActiveChat();
  const { responsiveChat, setResponsiveChat } = useResponsiveChat();
  const socket = useSocket();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const urlDataEnq = params.get("query");
  const { t } = useTranslation();
  const language = useSelector(getLanguage);

  useEffect(() => {
    const urlData = urlDataEnq ? decryptData(urlDataEnq) : "";

    if (urlData) {
      setActiveChatId(urlData?._id);
      setResponsiveChat(true);
      setChatUser({ lot: urlData });
      router.replace("/chat");
    }
  }, [urlDataEnq]);

  useEffect(() => {
    if (socket) {
      socket.on("conversation-list", (conversationList) => {
        updateChatList(conversationList);
      });
    }
    return () => {
      if (socket) {
        socket.off("conversation-list"); // Cleanup the event listener
      }
    };
  }, []);
  const handleError = (error) => {
    console.error("WebSocket connection error:", error);
    // You might want to set an error state or handle it appropriately
  };
  return (
    <div className="bg-light" dir={language === "ar" ? "rtl" : "ltr"}>
      <Container fluid="xxl" className="min-h-[80vh] mx-auto pt-1 pb-5">
        
          <div>
            <div className="chat_grid">
              <div
                className={`chat_screen ${
                  !responsiveChat ? "" : "d_chat_none"
                }`}
              >
                <div className="pb-1">
                  <div className="d-flex align-items-center justify-content-between px-3"></div>
                  <hr style={{ color: "#EDEEF0" }} className="mb-1" />
                  <h5 className="semibold_font px-[10px] py-[1rem]">
                    {t("message.heading1")}
                  </h5>
                  {/* <div className="position-relative mx-3 my-[12px]">
                    <span className="position-absolute mt-2 ms-3">
                      {" "}
                      <Search />{" "}
                    </span>
                    <input
                      type="text"
                      placeholder="Search"
                      className="py-2 regular_font border rounded-3 ps-5 w-100"
                      name=""
                      id=""
                    />
                  </div> */}
                  <hr style={{ color: "#EDEEF0" }} className="my-1" />
                  <ChatList />
                </div>
              </div>
              <div
                className={`chat_screen ${
                  responsiveChat ? "" : "d_chat_none"
                } `}
                id="chatScreen"
              >
                {activeChatId ? (
                  <ChatMessageList />
                ) : (
                  <div className="display_flex2 flex-column h-100 w-100">
                    <BiSolidMessageRounded style={{ fontSize: "30px" }} />
                    <h4 className="ms-2 my-0 msg_s00">
                      {t("message.heading4")}
                    </h4>
                    <h6
                      style={{ color: "#2D3D38" }}
                      className="text-center regular_font mt-2"
                    >
                      {t("message.heading2")}
                    </h6>
                  </div>
                )}
              </div>
            </div>
          </div>
        
      </Container>
    </div>
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
  );
};

export default Messages;
