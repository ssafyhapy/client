// src/WebSocketService.js
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
  constructor() {
    this.client = new Client({
      webSocketFactory: () =>
        new SockJS(`https://i11c209.p.ssafy.io/api/websocket`),
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = (frame) => {
      console.log("Connected: " + frame);
    };

    this.client.onStompError = (frame) => {
      console.error("STOMP error: " + frame.headers.message);
    };

    this.client.onWebSocketClose = () => {
      console.log("WebSocket closed");
    };

    this.client.onWebSocketError = (error) => {
      console.error("WebSocket error: " + error.message);
    };
  }

  connect(onConnectCallback) {
    this.client.onConnect = (frame) => {
      if (onConnectCallback) {
        onConnectCallback(frame);
      }
      console.log("Connected: " + frame);
    };
    this.client.activate();
  }

  subscribe(topic, onMessageCallback) {
    return this.client.subscribe(topic, (message) => {
      try {
        const parsedMessage = JSON.parse(message.body);
        if (onMessageCallback) {
          onMessageCallback(parsedMessage);
        }
      } catch (error) {
        console.error("Failed to parse message body as JSON:", message.body);
        console.error("Error:", error);
      }
    });
  }

  sendMessage(destination, content, memberName) {
    // Create a message object with content and memberName
    const message = {
      content,
      memberName,
    };

    // Ensure the body is serialized as JSON
    this.client.publish({
      destination,
      body: JSON.stringify(message),
    });
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
