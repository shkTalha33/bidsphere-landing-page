/* eslint-disable @next/next/no-img-element */
"use client"

/* eslint-disable no-unused-vars */
import Moment from "react-moment";
import { avataruser } from "../assets/icons/icon";

const ChatMessage = ({ message, data, timestamp, left, type }) => {
  return (
    <div>
      <div className={`pb-3 ${left ? "chat-message-left " : "chat-message-right"}`}>
        <div>
          <div
            className={`flex-shrink-1 poppins_regular ${left ? "chat_card_left" : "chat_card_right"
              }`}
            style={{ padding: "0.7rem 0.9rem", marginBottom: "0.2rem", wordWrap: "break-word" }}
          >
            {type === 'image' ? (
              <div className='relative selected_img'>
                <img width={1000} height={1000} src={message || avataruser} alt="Selected" className="w-100 rounded-3 h-100" />
              </div>
            ) : type === 'video' ? (
              <div className='relative selected_img'>
                <video src={message} controls className="w-100 rounded-3 h-100" />
              </div>
            ) : type === 'doc' ? (
              <div className="position-relative">
                <a href={message} target="__blank" className="text_white poppins_regular">
                  <span className={`text-sm poppins_regular`}>
                    {message}
                  </span>
                </a>
              </div>
            ) : (
              <span className={`text-sm poppins_regular`}>
                {message}
              </span>
            )}
          </div>
          <div
            className={`text-nowrap poppins_regular text-xs ${left ? "chat-message-left" : "chat-message-right"
              }`}
            style={{ color: "#848FAC", fontSize: '12px' }}
          >
            <Moment unix fromNow className="poppins_medium text-xs">
              {timestamp}
            </Moment>
          </div>
          {/* {data?.isOffer && (
            <div style={{ width: '100%', maxWidth: '250px' }} className="my-2 flex gap-1 flex-col items-start">
              <span className="poppins_regular text-xs text_secondary2">This message is related to: </span>
              <Link href={`/all-products/${data?.post?._id}`} className="flex gap-2 w-full hover:underline items-center border rounded-2 p-2">
                <Image src={data?.post?.images[0]} alt="" width={80} height={60} className="rounded-1 object-cover" />
                <span className="poppins_medium text_primary line-clamp-3 text-xs">
                  {data?.post?.title}
                </span>
              </Link>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
