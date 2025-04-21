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
import { socketURL } from "../api/axiosInstance";

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
        const newSocket = io(socketURL, {
          reconnectionAttempts: 15,
          transports: ["websocket"],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          randomizationFactor: 0.5,
          timeout: 20000,
        });

        newSocket.on("connect", () => {
          console.log("Connected to socket server");
          // Re-authenticate if needed
          newSocket.emit("authenticate", token);
        });
        newSocket.on("authenticated", (id) => {
          setSocket(newSocket);
        });

        newSocket.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
        });

        newSocket.on("unauthorized", (error) => {
          console.error("Unauthorized socket connection:", error.message);
        });
        newSocket.on('reconnect', (attemptNumber) => {
          console.log('Reconnected after', attemptNumber, 'attempts');
          // Re-authenticate after reconnection
          newSocket.emit('authenticate', token);
        });
        newSocket.on("disconnect", (reason) => {
          console.warn("Socket disconnected:", reason);
          setSocket(null);
          setTimeout(() => {
            console.log("Reconnecting socket...");
            initializeSocket();
          }, 3000); // 3-second delay before reconnecting
        });

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
