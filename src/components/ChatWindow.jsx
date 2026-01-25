import { useEffect, useState } from "react";
import createSocketConnection from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { targetUserId } = useParams();
  const userId = user?._id;


  const [socket, setSocket] = useState(null);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      message: newMessage,
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (!userId) return;

    const socketConn = createSocketConnection();
    setSocket(socketConn);

    socketConn.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketConn.on("messageReceived", ({ firstName, userId: msgUserId, message }) => {
   
      setMessages((prev) => [...prev, { firstName, userId: msgUserId, message }]);
    });

    return () => socketConn.disconnect();
  }, [userId, targetUserId]);

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-base-200 shadow-2xl rounded-2xl overflow-hidden border border-base-300">
      
      {/* 1. Header */}
      <div className="bg-base-300 p-4 border-b border-base-300">
        <h2 className="text-xl font-bold text-center italic">Playground Chat</h2>
      </div>

      {/* 2. Chat History Area (Dynamic) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`chat ${msg.userId === userId ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-header opacity-50 text-xs mb-1">
              {msg.firstName}
            </div>
            <div className={`chat-bubble shadow-md ${
              msg.userId === userId 
                ? "chat-bubble-primary" 
                : "chat-bubble-secondary"
            }`}>
              {msg.message}
            </div>
          </div>
        ))}
        
        {/* Empty state if no messages */}
        {messages.length === 0 && (
          <div className="text-center mt-10 opacity-30 italic">
            No transmissions yet... Start the conversation.
          </div>
        )}
      </div>

      {/* 3. Input Section */}
      <div className="p-4 bg-base-300 border-t border-base-300">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="input input-bordered flex-1 focus:outline-none focus:border-primary"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="btn btn-primary btn-circle shadow-lg hover:scale-105 active:scale-95 transition-all text-xl"
            onClick={handleSendMessage}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;