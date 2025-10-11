import { useEffect, useState } from "react";
import axios from "axios";
import { apiClient } from "@/lib/api-client";
import { HOST } from "@/utils/constants";

function getUserIdFromCookie() {
  const match = document.cookie.match(new RegExp("(^| )jwt=([^;]+)"));
  if (!match) return null;

  const token = match[2];
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId;
  } catch (err) {
    console.error("Error decoding JWT:", err);
    return null;
  }
}

export default function ChatBox({ receiverId, onClose }) {
  const senderId = getUserIdFromCookie();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!senderId || !receiverId) return;

      try {
        const res = await apiClient.get(`/api/chat/${senderId}/${receiverId}`);
        setChat(res.data.messages || []);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    fetchMessages();
  }, [senderId, receiverId]);

  const sendMessage = async () => {
    if (!message.trim() || !senderId || !receiverId) return;

    const msgObj = { senderId, receiverId, message };

    try {
      await apiClient.post("/api/chat/send", msgObj);

      setChat((prev) => [
        ...prev,
        { ...msgObj, createdAt: new Date().toISOString() },
      ]);

      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Chat</h2>
        <button onClick={onClose} className="text-red-500 font-bold">
          X
        </button>
      </div>

      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`my-1 text-sm ${
              msg.senderId === senderId ? "text-right" : "text-left"
            }`}
          >
            <span className="inline-block px-2 py-1 rounded bg-gray-200">
              {msg.message}
            </span>
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
      <button
        onClick={sendMessage}
        className="w-full bg-green-500 text-white py-1 rounded"
      >
        Send
      </button>
    </div>
  );
}
