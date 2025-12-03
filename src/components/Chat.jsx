import { useEffect, useState, useRef } from "react";
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

  const chatContainerRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      console.log("Initial messages:", chat.data.messages);

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
      console.error("Error fetching messages:", err);
    }
  };

  // 1) Load history on mount
  useEffect(() => {
    fetchChatMessages();
  }, []);

  // 2) Set up socket listeners
  useEffect(() => {
    if (!userId || !targetUserId) return;

    // join room
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    const handleMessageReceived = ({ firstName, lastName, text }) => {
      console.log(firstName + " : " + text);
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
    };

    socket.on("messageRecieved", handleMessageReceived);

    // ❗ Do NOT disconnect the socket here, just remove this listener
    return () => {
      socket.off("messageRecieved", handleMessageReceived);
    };
  }, [userId, targetUserId, user.firstName]);

  // 3) Send message (with optimistic UI update)
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msg = {
      firstName: user.firstName,
      lastName: user.lastName,
      text: newMessage,
    };

    // 👉 Show my own message immediately
    setMessages((prev) => [...prev, msg]);

    // send to server (which will store in DB and also emit to others)
    socket.emit("sendMessage", {
      ...msg,
      userId,
      targetUserId,
    });

    setNewMessage("");
  };

  // 4) Auto-scroll whenever messages change
  useEffect(() => {
    if (!chatContainerRef.current) return;

    chatContainerRef.current.scrollTop =
      chatContainerRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-5"
      >
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

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-black rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
