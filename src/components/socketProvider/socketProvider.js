/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("auction_user_token")
      : null;
  const [socket, setSocket] = useState(null);
  const socketRef = useRef(null);
  const dispatch = useDispatch(null);

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const newSocket = io("https://api.castle-auction.com/", {
          reconnectionAttempts: 15,
          transports: ["websocket"],
        });
        newSocket.emit("authenticate", token);
        newSocket.on("authenticated", (id) => {
          setSocket(newSocket);
        });
        newSocket.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
        });

        newSocket.on("unauthorized", (error) => {
          console.error("Unauthorized socket connection:", error.message);
        });
        // newSocket.on("disconnect", () => {
        //   console.log("Socket disconnected. Attempting to reconnect...");
        //   setSocket(null);
        //   initializeSocket();
        // });
        socketRef.current = newSocket;
      } catch (error) {
        console.error("Error initializing socket:", error);
      }
    };
    if (token) {
      initializeSocket();
      console.log("===============Socket Initialize");
    } else {
      console.log("No token found for authentication");
    }
    return () => {
      if (!token && socketRef.current) {
        console.log("Disconnecting socket...");
        socketRef.current.disconnect();
        setSocket(null);
      }
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
