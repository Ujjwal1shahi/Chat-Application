import { createContext, useContext, useEffect, useState } from "react";
import { useAppStore } from "../store";
import { HOST } from "../utils/constants";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { userInfo } = useAppStore();
  const getUserId = (value) =>
    typeof value === "string" ? value : value?._id || value?.id;

  useEffect(() => {
    if (!userInfo) return;

    const userId = getUserId(userInfo);
    if (!userId) {
      setSocket(null);
      return;
    }

    const newSocket = io(HOST, {
      withCredentials: true,
      query: { userId },
    });

    const onMessageReceived = (message) => {
      const { selectedChatData, selectedChatType, addMessage } =
        useAppStore.getState();
      if (selectedChatType !== "contact") return;

      const activeChatId = getUserId(selectedChatData);
      if (!activeChatId) return;

      const senderId = getUserId(message?.sender);
      const recipientId = getUserId(message?.recipient);

      if (activeChatId === senderId || activeChatId === recipientId) {
        addMessage(message);
      }
    };

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("receiveMessage", onMessageReceived);

    setSocket(newSocket);

    return () => {
      newSocket.off("receiveMessage", onMessageReceived);
      newSocket.disconnect();
      setSocket(null);
    };
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
