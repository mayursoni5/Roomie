import { useEffect, useState } from "react";
import socket from "./socket";
import axios from "axios";

function getUserIdFromCookie() {
  const match = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'));
  if (!match) return null;

  const token = match[2];
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
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

  // Fetch chat history when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      if (!senderId || !receiverId) return;

      try {
        const res = await axios.get(`http://localhost:3000/api/chat/${senderId}/${receiverId}`);
        setChat(res.data.messages);
        console.log("Fetched chat history:", res.data.messages);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    fetchMessages();
  }, [senderId, receiverId]);

  useEffect(() => {
    if (!senderId) return;

    // Debug connection
    socket.on("connect", () => {
      console.log("Connected to Socket.io server:", socket.id);
    });

    socket.emit("addUser", senderId);
    console.log("addUser event sent with:", senderId);

    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      console.log("New message received via socket:", msg);
      setChat((prev) => {
        // Prevent duplicate messages by checking the message _id
        if (!prev.some((item) => item._id === msg._id)) {
          return [...prev, msg];
        }
        return prev;
      });
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("receiveMessage");
      console.log("ChatBox unmounted & receiveMessage listener removed.");
    };
  }, [senderId]);

  // Handling message input and send action
  const sendMessage = async () => {
    if (!message.trim() || !senderId || !receiverId) return;

    const msgObj = { senderId, receiverId, message };
    console.log("Sending message via axios and socket:", msgObj);

    try {
      // Save the message to the server (optional)
      await axios.post("http://localhost:3000/api/chat/send", msgObj);

      // Emit the message to the receiver via socket
      socket.emit("sendMessage", msgObj);

      // Immediately update chat UI with the sent message
      setChat((prev) => [...prev, { ...msgObj, createdAt: new Date().toISOString() }]);

      // Clear input field after sending the message
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Re-render the UI whenever the chat state changes
  useEffect(() => {
    console.log("Chat state updated:", chat);
  }, [chat]);

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
