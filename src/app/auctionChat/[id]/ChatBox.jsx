/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState, useCallback } from "react";
import moment from "moment";
import { avataruser } from "@/components/assets/icons/icon";
import Image from "next/image";
import ApiFunction from "@/components/api/apiFuntions";
import { getLiveChat } from "@/components/api/ApiFile";
import { FixedSizeList as List } from "react-window";

const ChatBox = ({ messages, userData, setChatMessage, id }) => {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const { get } = ApiFunction();
  const [isLoading, setIsLoading] = useState(false);
  const [oldMsgAvailable, setOldMsgAvailable] = useState(true);
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  const fetchOldMessages = async () => {
    const firstMessageId = messages[0]?._id;
    if (!firstMessageId || isLoading || !oldMsgAvailable) return;

    setIsLoading(true);
    try {
      const api = `${getLiveChat}/${id}/${firstMessageId}`;
      const res = await get(api);
      if (res?.success && res?.messages?.length > 0) {
        const prevHeight = containerRef.current.scrollHeight;
        setChatMessage((prev) => [...res.messages.reverse(), ...prev]);

        setTimeout(() => {
          const newHeight = containerRef.current.scrollHeight;
          const scrollDiff = newHeight - prevHeight;
          containerRef.current.scrollTop += scrollDiff;
        }, 100);
      } else {
        setOldMsgAvailable(false);
      }
    } catch (error) {
      console.error("Error loading old messages", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to bottom ONLY once on first mount
  useEffect(() => {
    if (!initialScrollDone && listRef.current) {
      listRef.current.scrollToItem(messages.length - 1, "end");
      setInitialScrollDone(true);
    }
  }, [messages.length, initialScrollDone]);
  useEffect(() => {
    if (isUserAtBottom && listRef.current) {
      listRef.current.scrollToItem(messages.length - 1, "end");
    }
  }, [messages]);

  const Row = useCallback(
    ({ index, style }) => {
      const msg = messages[index];
      const isMe = msg?.sender?._id === userData?._id;

      return (
        <div style={style}>
          <div
            className={`flex mb-3 ${isMe ? "justify-end" : "justify-start"}`}
          >
            {!isMe && (
              <div className="flex items-start mr-2">
                {msg?.sender?.profile ? (
                  <img
                    src={msg?.sender?.profile}
                    alt={`${msg?.sender?.fname} ${msg?.sender?.lname}`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src={avataruser}
                    alt={`${msg?.sender?.fname} ${msg?.sender?.lname}`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </div>
            )}
            <div
              className={`p-2 rounded-xl ${
                isMe ? "bg_primary text-white" : "bg-[#f2f3f5] text-black"
              }`}
              style={{ maxWidth: "70%", wordBreak: "break-word" }}
            >
              {!isMe && (
                <div className="font-semibold text-sm">
                  {msg?.sender?.fname} {msg?.sender?.lname}
                </div>
              )}
              <div className="text-[0.9rem] font-medium">{msg?.message}</div>
              <small
                className={`block text-[0.7rem] mt-1 ${
                  isMe ? "text-white/70" : "text-gray-500"
                }`}
              >
                {moment(msg?.createdAt).fromNow()}
              </small>
            </div>
          </div>
        </div>
      );
    },
    [messages]
  );

  return (
    <div
      ref={containerRef}
      id="chat-scroll"
      className="max-h-[30rem] overflow-y-auto p-4 mt-[3rem]"
      style={{ position: "relative" }}
    >
      {/* Loading Spinner at top */}
      {isLoading && (
        <div className="flex justify-center items-center mb-2">
          <div className="loader border-t-2 border-b-2 border-blue-500 rounded-full w-5 h-5 animate-spin" />
        </div>
      )}

      <List
        height={480}
        itemCount={messages.length}
        itemSize={100}
        width="100%"
        onScroll={({
          scrollOffset,
          scrollUpdateWasRequested,
          scrollDirection,
        }) => {
          if (!containerRef.current) return;

          // When user scrolls to top, fetch old messages
          if (scrollOffset === 0 && scrollDirection === "backward") {
            fetchOldMessages();
          }

          const bottomThreshold = 50; // how close to bottom we consider "at bottom"
          const maxScroll =
            containerRef.current.scrollHeight -
            containerRef.current.clientHeight;

          setIsUserAtBottom(maxScroll - scrollOffset <= bottomThreshold);
        }}
        ref={listRef}
      >
        {Row}
      </List>
    </div>
  );
};

export default ChatBox;
