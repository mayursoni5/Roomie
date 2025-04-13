// src/components/Chat/ChatBox.jsx
import { useEffect, useState } from "react";
import socket from "./socket";
import axios from "axios";

export default function ChatBox({ senderId, receiverId, onClose }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`http://localhost:3000/api/chat/${senderId}/${receiverId}`);
      setChat(res.data.messages);
    };
    fetchMessages();
  }, [senderId, receiverId]);

  useEffect(() => {
    socket.emit("addUser", senderId);

    socket.on("receiveMessage", (msg) => {
      if (msg.senderId === receiverId) {
        setChat((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [receiverId, senderId]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const msgObj = { senderId, receiverId, message };

    await axios.post("http://localhost:3000/api/chat/send", msgObj);
    socket.emit("sendMessage", msgObj);
    setChat((prev) => [...prev, msgObj]);
    setMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Chat</h2>
        <button onClick={onClose} className="text-red-500 font-bold">X</button>
      </div>

      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {chat.map((msg, i) => (
          <div key={i} className={`my-1 text-sm ${msg.senderId === senderId ? "text-right" : "text-left"}`}>
            <span className="inline-block px-2 py-1 rounded bg-gray-200">{msg.message}</span>
          </div>
        ))}
      </div>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage} className="w-full bg-green-500 text-white py-1 rounded">
        Send
      </button>
    </div>
  );
}
