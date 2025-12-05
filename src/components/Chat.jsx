import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constent";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // 1) Fetch existing chat history
  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages =
        chat?.data?.messages?.map((msg) => {
          const { senderId, text } = msg;
          return {
            firstName: senderId?.firstName,
            lastName: senderId?.lastName,
            text,
          };
        }) || [];

      setMessages(chatMessages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);

  // 2) Join room + listen for incoming messages
  useEffect(() => {
    if (!userId || !targetUserId) return;

    // join room on server
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    const handleMessageReceived = ({ firstName, lastName, text }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
    };

    socket.on("messageRecieved", handleMessageReceived);

    // cleanup: remove listener only (don't disconnect global socket)
    return () => {
      socket.off("messageRecieved", handleMessageReceived);
    };
  }, [userId, targetUserId, user?.firstName]);

  // 3) Send message via socket + optimistic UI
  const sendMessage = () => {
    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const outgoing = {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: trimmed,
    };

    // 🔥 Optimistic update: show message immediately
    setMessages((prev) => [
      ...prev,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        text: trimmed,
      },
    ]);

    socket.emit("sendMessage", outgoing);

    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              "chat " +
              (user.firstName === msg.firstName ? "chat-end" : "chat-start")
            }
          >
            <div className="chat-header">
              {`${msg.firstName || ""} ${msg.lastName || ""}`}
            </div>
            <div className="chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <div
        className="
          p-3 sm:p-5 border-t border-gray-600 
          flex flex-col sm:flex-row 
          items-stretch sm:items-center 
          gap-2
        "
      >
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-black rounded p-2 text-sm sm:text-base"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button
          onClick={sendMessage}
          className="btn btn-secondary w-full sm:w-auto"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
