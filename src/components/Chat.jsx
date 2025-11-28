import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  useEffect(() => {
    if (!userId || !targetUserId) return;

    // join room
    socket.emit("joinChat", [userId, targetUserId]);

    // listen for incoming messages
    const handler = ({ firstName, message }) => {
      setMessages((prev) => [...prev, { firstName, message }]);
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
      // optional: socket.disconnect(); // only if you want to close on leaving page
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      message: newMessage,
    });

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
              {msg.firstName}
              <time className="text-xs opacity-50"> 2 hours ago</time>
            </div>
            <div className="chat-bubble">{msg.message}</div>
            <div className="chat-footer opacity-50">Seen</div>
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
