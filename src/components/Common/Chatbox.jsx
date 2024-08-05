import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import webSocketService from "../../WebSocketService";

import chatsendbutton from "../../assets/Common/chatsendbutton.png";

import useAuthStore from "../../store/useAuthStore";

import defaultProfile from "../../assets/Profile/defaultprofile.png";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const roomId = 1; // Define room ID here or receive it from props

  const { memberName } = useAuthStore();

  // console.log(memberName)

  useEffect(() => {
    // Connect to WebSocket
    webSocketService.connect(() => {
      webSocketService.subscribe(`/api/sub/${roomId}`, (newMessage) => {
        // console.log(newMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            from: newMessage.memberName,
            message: newMessage.content,
            profileImage: "src/assets/Common/mic.webp", // Adjust if needed
            timestamp: new Date(), // Consider adjusting based on incoming message timestamp
          },
        ]);
      });
    });

    return () => {
      webSocketService.client.deactivate(); // Clean up WebSocket connection
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }
    // Send message via WebSocket
    webSocketService.sendMessage(
      `/api/pub/message/${roomId}`,
      newMessage,
      memberName
    );
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Function to keep the view scrolled to the bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // Your existing UI code remains here
    <div className="flex flex-col rounded-[20px] w-full h-full bg-[rgba(255,255,255,0.4)] p-3 overflow-hidden">
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col mb-4 ${
              msg.from === memberName ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-center mb-2">
              {msg.from !== memberName && (
                <div className="flex items-center flex-row">
                  <img
                    src={msg.profileImage || defaultProfile} // Set a default image path if msg.profileImage is undefined
                    onError={(e) => {
                      e.target.onerror = null; // Prevents looping
                      e.target.src = defaultProfile; // Fallback image
                    }}
                    alt={`${msg.from}'s profile`}
                    className="w-8 h-8 rounded-full mr-2"
                  />

                  <span className="text-xs mr-2 font-bold">{msg.from}</span>
                </div>
              )}
              <div className="text-xs text-gray-500">
                {moment(msg.timestamp).format("HH:mm")}
              </div>
              {msg.from === memberName && (
                <div className="flex items-center flex-row-reverse">
                  <img
                    src={msg.profileImage || defaultProfile} // Set a default image path if msg.profileImage is undefined
                    onError={(e) => {
                      e.target.onerror = null; // Prevents looping
                      e.target.src = defaultProfile; // Fallback image
                    }}
                    alt={`Your profile`}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-xs ml-2 font-bold">{memberName}</span>
                </div>
              )}
            </div>
            <div
              className={`p-2 rounded-lg break-words ${
                msg.from === memberName
                  ? "bg-[rgba(0,112,246,0.25)] text-white text-sm"
                  : "bg-[rgba(14,107,255,0.5)] text-white text-sm"
              }`}
              style={{ maxWidth: "75%" }}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-start">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 rounded-lg text-sm bg-transparent resize-none overflow-y-auto"
            placeholder="Type your message..."
            rows={3}
            style={{ height: "4rem" }}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
          >
            <img
              className="w-5"
              src={chatsendbutton}
              alt="chatbox-send-button"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;

// import React, { useState, useEffect, useRef } from "react";
// import moment from "moment";

// import chatsendbutton from "../../assets/Common/chatsendbutton.png"

// const Chatbox = () => {
//   const [messages, setMessages] = useState([
//     // 임시 메시지
//     {
//       from: "Marry",
//       message: "Hi there, how are you?",
//       profileImage: "src/assets/common/mic.webp",
//       timestamp: new Date(),
//     },
//   ]);

//   const [newMessage, setNewMessage] = useState("");
//   //   스크롤 길어지면 제일 최신 메시지로 가는 변수 설정 (스크롤 자동으로 아래로 내려가게)
//   const messagesEndRef = useRef(null);

//   //   스크롤 맨 아래로 내리는 함수
//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") {
//       return;
//     }
//     const newMessageObj = {
//       from: "You",
//       message: newMessage,
//       profileImage: "src/assets/common/smileyface.webp",
//       timestamp: new Date(),
//     };
//     setMessages([...messages, newMessageObj]);
//     setNewMessage("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="flex flex-col rounded-[20px] w-full h-full bg-[rgba(255,255,255,0.4)] p-3 overflow-hidden">
//       <div className="flex-1 overflow-y-auto scrollbar-none">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex flex-col mb-4 ${
//               msg.from === "You" ? "items-end" : "items-start"
//             }`}
//           >
//             <div className="flex items-center mb-2">
//               {msg.from !== "You" && (
//                 <div className="flex items-center flex-row">
//                   <img
//                     src={msg.profileImage}
//                     alt={`${msg.from}'s profile`}
//                     className="w-8 h-8 rounded-full mr-2"
//                   />
//                   <span className="text-xs mr-2 font-bold">{msg.from}</span>
//                 </div>
//               )}
//               <div className="text-xs text-gray-500">
//                 {moment(msg.timestamp).format("HH:mm")}
//               </div>
//               {msg.from === "You" && (
//                 <div className="flex items-center flex-row-reverse">
//                   <img
//                     src={msg.profileImage}
//                     alt="Your profile"
//                     className="w-8 h-8 rounded-full ml-2"
//                   />
//                   <span className="text-xs ml-2 font-bold">You</span>
//                 </div>
//               )}
//             </div>
//             <div
//               className={`p-2 rounded-lg break-words ${
//                 msg.from === "You"
//                   ? "bg-[rgba(0,112,246,0.25)] text-white text-sm"
//                   : "bg-[rgba(14,107,255,0.5)] text-white text-sm"
//               }`}
//               style={{ maxWidth: "75%" }}
//             >
//               {msg.message}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="p-4 border-t border-gray-200">
//         <div className="flex items-start">
//           <textarea
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="flex-1 p-2 rounded-lg text-sm bg-transparent resize-none overflow-y-auto"
//             placeholder="Type your message..."
//             rows={3}
//             style={{ height: "4rem" }}
//           />
//           <button
//             onClick={handleSendMessage}
//             className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
//           >
//             <img
//               className="w-5"
//               src={chatsendbutton}
//               alt="chatbox-send-button"
//             />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbox;
