// src/WebSocketService.jsx
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
  constructor() {
    this.client = new Client({
      webSocketFactory: () =>
        new SockJS("https://i11c209.p.ssafy.io/api/websocket"),
      debug: (str) => {
        console.log(`STOMP Debug: ${str}`);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.subscriptions = {};
    this.connected = false;
  }

  connect(onConnectCallback) {
    this.client.onConnect = (frame) => {
      this.connected = true;
      console.log("Connected to STOMP: " + frame);
      if (onConnectCallback) {
        onConnectCallback(frame);
      }
    };

    this.client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    this.client.onWebSocketClose = () => {
      this.connected = false;
      console.log("WebSocket connection closed");
    };

    this.client.onWebSocketError = (error) => {
      this.connected = false;
      console.error("WebSocket error: " + error);
    };

    this.client.activate();
  }

  subscribe(topic, onMessageCallback) {
    if (!this.connected) {
      console.error("Cannot subscribe, no connection established");
      return;
    }

    console.log(`Subscribing to topic: ${topic}`);
    if (this.subscriptions[topic]) {
      this.subscriptions[topic].unsubscribe();
    }

    this.subscriptions[topic] = this.client.subscribe(topic, (message) => {
      try {
        const parsedMessage = JSON.parse(message.body);
        console.log(`Received message on topic ${topic}:`, parsedMessage);
        if (onMessageCallback) {
          onMessageCallback(parsedMessage);
        }
      } catch (error) {
        console.error("Failed to parse message body as JSON:", message.body);
        console.error("Error:", error);
      }
    });
  }

  unsubscribe(topic) {
    if (this.subscriptions[topic]) {
      this.subscriptions[topic].unsubscribe();
      delete this.subscriptions[topic];
      console.log(`Unsubscribed from topic: ${topic}`);
    }
  }

  sendMessage(destination, body) {
    if (!this.connected) {
      console.error("Cannot send message, no connection established");
      return;
    }

    console.log(`Sending message to ${destination}:`, body);
    this.client.publish({
      destination: destination,
      body: JSON.stringify(body),
    });
  }

  sendIntro(roomId, memberId, content) {
    this.sendMessage(`/api/pub/intro/${roomId}/check`, { memberId, content });
  }

  sendNext(roomId) {
    this.sendMessage(`/api/pub/intro/${roomId}/next`, {});
  }

  sendMemberState(roomId, memberState) {
    this.sendMessage(`/api/pub/${roomId}/state`, { memberState });
  }

  subscribeToMemberState(roomId, onMessageCallback) {
    this.subscribe(`/api/sub/${roomId}/state`, onMessageCallback);
  }

  deactivate() {
    this.client.deactivate();
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;

// ======================================================================

// // src/WebSocketService.js
// import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

// class WebSocketService {
//   constructor() {
//     this.client = new Client({
//       webSocketFactory: () =>
//         new SockJS(`https://i11c209.p.ssafy.io/api/websocket`),
//       debug: (str) => {
//         console.log(str);
//       },
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//     });

//     this.client.onConnect = (frame) => {
//       console.log("Connected: " + frame);
//     };

//     this.client.onStompError = (frame) => {
//       console.error("STOMP error: " + frame.headers.message);
//     };

//     this.client.onWebSocketClose = () => {
//       console.log("WebSocket closed");
//     };

//     this.client.onWebSocketError = (error) => {
//       console.error("WebSocket error: " + error.message);
//     };
//   }

//   connect(onConnectCallback) {
//     this.client.onConnect = (frame) => {
//       if (onConnectCallback) {
//         onConnectCallback(frame);
//       }
//       console.log("Connected: " + frame);
//     };
//     this.client.activate();
//   }

//   subscribe(topic, onMessageCallback) {
//     return this.client.subscribe(topic, (message) => {
//       try {
//         const parsedMessage = JSON.parse(message.body);
//         if (onMessageCallback) {
//           onMessageCallback(parsedMessage);
//         }
//       } catch (error) {
//         console.error("Failed to parse message body as JSON:", message.body);
//         console.error("Error:", error);
//       }
//     });
//   }

//   sendMessage(destination, content, memberName) {
//     // Create a message object with content and memberName
//     const message = {
//       content,
//       memberName,
//     };

//     // Ensure the body is serialized as JSON
//     this.client.publish({
//       destination,
//       body: JSON.stringify(message),
//     });
//   }
// }

// const webSocketService = new WebSocketService();
// export default webSocketService;
