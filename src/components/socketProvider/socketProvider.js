/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setConversationCount, setNotificationCount, setNotificationData } from "../redux/chat-message";

// Create a Context for the socket
const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

// Socket Provider component
export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth.isLogin);
    const notificationData = useSelector((state) => state.chat?.notificationData) || [];

    // Mutable ref to always hold the latest value of notificationData
    const notificationRef = useRef(notificationData);

    // Update the ref whenever notificationData changes
    useEffect(() => {
        notificationRef.current = notificationData;
    }, [notificationData]);

    useEffect(() => {
        if (isLogin) {
            // Initialize the socket connection
            socketRef.current = io.connect('https://setofshopsbackend.onrender.com', {
                query: { token: localStorage.getItem("setofshops_user_token") },
            });

            const socket = socketRef.current;

            socket.on("connect", () => {
                console.log("Socket connected");
                setSocket(socket);
            });

            socket.on("notification", (notification) => {
                const newNotification = [notification, ...notificationRef.current]
                dispatch(setNotificationData(newNotification))
                // Update Redux store with the new notification
            });

            socket.on("notification-count", (count) => {
                dispatch(setNotificationCount(count));
            });

            socket.on("conversation-count", (count) => {
                dispatch(setConversationCount(count));
            });

            socket.on("authentication", (authData) => {
                console.log("Authentication data:", authData);
            });

            socket.on("disconnected", () => {
                console.log("Socket disconnected");
            });

            socket.on("connect_error", (error) => {
                console.error("WebSocket connection error:", error);
            });
        }

        // Cleanup when `isLogin` changes or component unmounts
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                setSocket(null);
            }
        };
    }, [isLogin]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
