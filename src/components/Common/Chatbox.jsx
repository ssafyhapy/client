import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import webSocketService from "../../WebSocketService";
// import chatsendbutton from "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/chatsendbutton.png";
// import chatsendbutton from "./../../assets/Common/chatsendbutton.png"
import useAuthStore from "../../store/useAuthStore";
import useChatStore from "../../store/useChatStore";
// import defaultProfile from "../../assets/Profile/defaultprofile.png";

const Chatbox = () => {
  const chatsendbutton =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/chatsendbutton.png";
  const defaultProfile =
    "https://sarrr.s3.ap-northeast-2.amazonaws.com/assets/defaultprofile.png";
    const { messages, addMessage } = useChatStore(); // Use addMessage from Zustand store
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
  
    const roomId = 1;
    const { memberName } = useAuthStore();
  
    useEffect(() => {
      const handleMessageReceived = (newMessage) => {
        addMessage({
          from: newMessage.memberName,
          message: newMessage.content,
          profileImage: newMessage.profileImage || defaultProfile,
          timestamp: new Date(),
        });
      };
  
      // webSocketService.connect(() => {
        webSocketService.subscribe(`/api/sub/${roomId}`, handleMessageReceived);
      // });
  
      return () => {
        webSocketService.deactivate();
      };
    }, [roomId, addMessage]); // Include addMessage in the dependencies array
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleSendMessage = () => {
      if (newMessage.trim() === "") {
        return;
      }
      webSocketService.sendMessage(
        `/api/pub/message/${roomId}`,
        { content: newMessage, memberName },
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
  
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
  useEffect(() => {
    // console.log("[*]messages", messages);
  }, [messages]);

  return (
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
                    src={msg.profileImage || defaultProfile}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultProfile;
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
                    src={msg.profileImage || defaultProfile}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultProfile;
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
// import webSocketService from "../../WebSocketService";

// import chatsendbutton from "../../assets/Common/chatsendbutton.png";

// import useAuthStore from "../../store/useAuthStore";

// import defaultProfile from "../../assets/Profile/defaultprofile.png";

// const Chatbox = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesEndRef = useRef(null);

//   const roomId = 1; // Define room ID here or receive it from props

//   const { memberName } = useAuthStore();

//   // console.log(memberName)

//   useEffect(() => {
//     // Connect to WebSocket
//     webSocketService.connect(() => {
//       webSocketService.subscribe(`/api/sub/${roomId}`, (newMessage) => {
//         // console.log(newMessage);
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             from: newMessage.memberName,
//             message: newMessage.content,
//             profileImage: newMessage.profileImage, // Adjust if needed
//             timestamp: new Date(), // Consider adjusting based on incoming message timestamp
//           },
//         ]);
//       });
//     });

//     return () => {
//       webSocketService.client.deactivate(); // Clean up WebSocket connection
//     };
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") {
//       return;
//     }
//     // Send message via WebSocket
//     webSocketService.sendMessage(
//       `/api/pub/message/${roomId}`,
//       newMessage,
//       memberName
//     );
//     setNewMessage("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // Function to keep the view scrolled to the bottom
//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     // Your existing UI code remains here
//     <div className="flex flex-col rounded-[20px] w-full h-full bg-[rgba(255,255,255,0.4)] p-3 overflow-hidden">
//       <div className="flex-1 overflow-y-auto scrollbar-none">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex flex-col mb-4 ${
//               msg.from === memberName ? "items-end" : "items-start"
//             }`}
//           >
//             <div className="flex items-center mb-2">
//               {msg.from !== memberName && (
//                 <div className="flex items-center flex-row">
//                   <img
//                     src={msg.profileImage || defaultProfile} // Set a default image path if msg.profileImage is undefined
//                     onError={(e) => {
//                       e.target.onerror = null; // Prevents looping
//                       e.target.src = defaultProfile; // Fallback image
//                     }}
//                     alt={`${msg.from}'s profile`}
//                     className="w-8 h-8 rounded-full mr-2"
//                   />

//                   <span className="text-xs mr-2 font-bold">{msg.from}</span>
//                 </div>
//               )}
//               <div className="text-xs text-gray-500">
//                 {moment(msg.timestamp).format("HH:mm")}
//               </div>
//               {msg.from === memberName && (
//                 <div className="flex items-center flex-row-reverse">
//                   <img
//                     src={msg.profileImage || defaultProfile} // Set a default image path if msg.profileImage is undefined
//                     onError={(e) => {
//                       e.target.onerror = null; // Prevents looping
//                       e.target.src = defaultProfile; // Fallback image
//                     }}
//                     alt={`Your profile`}
//                     className="w-8 h-8 rounded-full mr-2"
//                   />
//                   <span className="text-xs ml-2 font-bold">{memberName}</span>
//                 </div>
//               )}
//             </div>
//             <div
//               className={`p-2 rounded-lg break-words ${
//                 msg.from === memberName
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
