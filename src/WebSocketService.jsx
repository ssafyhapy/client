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

  // ========================================================================================

  // 한줄 자기소개 모달 작성하고 완료버튼 누르면 날아가는거임
  sendIntro(roomId, memberId, content) {
    this.sendMessage(`/api/pub/intro/${roomId}/check`, { memberId, content });
  }

  // 한줄 자기소개 각각 하나씩 띄워주는 역할 + 마지막사람이면 다음 state 보내주는 역할
  sendIntroNext(roomId) {
    this.sendMessage(`/api/pub/intro/${roomId}/next`, {});
  }

  // 한줄 자기소개 하나씩 데이터 받아온다
  subscribeToIntro(roomId, onMessageCallback) {
    this.subscribe(`/api/sub/intro/${roomId}/next`, onMessageCallback);
  }

  // ========================================================================================

  // 대기실 - selfintro 넘어갈때 나 intro로 넘어가야함! 하고 알려주는거
  sendMemberState(roomId, memberState) {
    this.sendMessage(`/api/pub/${roomId}/state`, { memberState });
  }

  // intro로 넘어가!! 하고 sub하고 있다 메시지 받는거
  subscribeToMemberState(roomId, onMessageCallback) {
    this.subscribe(`/api/sub/${roomId}/state`, onMessageCallback);
  }

  // ========================================================================================

  // 나를 맞춰봐 모달 작성하고 완료버튼 누르면 데이터 백으로 보냄
  sendGuessMe(roomId, questions) {
    this.sendMessage(`/api/pub/ox/${roomId}/check`, questions);
  }

  // 나를맞춰봐 다음거 달라고 백에 보내줌
  sendGuessMeNext(roomId, memberId, nowIndex) {
    this.sendMessage(`/api/pub/ox/${roomId}/next`, { memberId, nowIndex });
  }

  // 나를맞춰봐 다음 데이터 계속 받아옴
  subscribeToGuessMe(roomId, onMessageCallback) {
    this.subscribe(`/api/sub/ox/${roomId}/next`, onMessageCallback);
  }

  // 나를맞춰봐 선택 결과 백에 전달
  sendGuessMeSelection(roomId, memberId, answer) {
    this.sendMessage(`/api/pub/ox/${roomId}/selection`, { memberId, answer });
  }

  // 나를 맞춰봐 선택 결과 받아오기
  subscribeToSelections(roomId, onMessageCallback) {
    this.subscribe(`/api/sub/ox/${roomId}/selection`, onMessageCallback);
  }

  // ========================================================================================

  // 밸런스 게임 모달 내용 백에 보내줌 + 주제 변경 버튼 누를때마다 pub
  sendBalancePurpose(roomId, purpose) {
    this.sendMessage(`/api/pub/balance/${roomId}/get-question`, { purpose });
  }

  // 밸런스 게임 주제 추천해준거 받아온다!! sub
  subscribeToBalanceTopic(roomId, onMessageCallback) {
    this.subscribe(
      `/api/sub/balance/${roomId}/get-question`,
      onMessageCallback
    );
  }

  // 밸런스게임 확정된 주제 백에 보내줌 pub
  sendBalanceChosenTopic(roomId, optionFirst, optionSecond) {
    this.sendMessage(`/api/pub/balance/${roomId}/save-question`, {
      optionFirst,
      optionSecond,
    });
  }

  // 밸런스게임 주제확정된거 다시 받음 (id필요해) sub
  // 이거 id는 기억해둬야 함
  subscribeToBalanceChosenTopic(roomId, onMessageCallback) {
    this.subscribe(
      `/api/sub/balance/${roomId}/save-question`,
      onMessageCallback
    );
  }

  // 밸런스게임 사람들이 고른 개인적 선택지 백에 보내줌 pub
  sendBalancePersonChoice(
    roomId,
    balanceQuestionId,
    memberId,
    balanceResultSelectedOption
  ) {
    this.sendMessage(`/api/pub/balance/${roomId}/selection`, {
      balanceQuestionId,
      memberId,
      balanceResultSelectedOption,
    });
  }

  // 밸런스게임 사람들이 고른 개인적 선택지 받아온다!! sub
  subscribeToBalancePersonChoice(roomId, onMessageCallback) {
    this.subscribe(`/api/sub/balance/${roomId}/selection`, onMessageCallback);
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
