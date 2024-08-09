import React from "react";
import { useState, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";

const gameStep = useGameStore((state) => state.gameStep);
const setGameStep = useGameStore((state) => state.setGameStep);
const {
  mainStreamManager,
  setMainStreamManager,
  publisher,
  setPublisher,
  setSubscriber,
  subscribers,
  setSubscribers,
  connectionInfo,
  setConnectionInfo,
} = useGameStore();

const { webrtc } = useRoomStore();
const [session, setSession] = useState(null);

const OV = new OpenVidu();

useEffect(() => {
  const joinSession = async () => {
    const session = OV.initSession();

    session.on("streamCreated", (event) => {
      console.log("[*]stream Created event", event);
      const subscriber = session.subscribe(event.stream, undefined);
      // 현재 구독자로 구독자 변경
      setSubscriber(subscriber);
      console.log("[*]Subscriber created", subscriber);

      subscriber.on("videoElementCreated", (event) => {
        console.log("[*]Video Element Created", event.element);
      });

      //   구독자 명단 갱신
      setSubscribers(subscriber);
    });

    session.on("connectionCreated", (event) => {
      console.log("[*] connection", event.connection);
      const connectionData = JSON.parse(event.connection.data);
      console.log(connectionData);
      const memberId = connectionData.memberId;
      const newConnectionData = {
        connectionId: event.connection.connectionId,
        memberName: connectionData.memberName,
        memberId: memberId,
      };
      console.log("[*] newconnectionData", newConnectionData);
      setConnectionInfo(newConnectionData);
    });

    session.on("streamDestroyed", (event) => {
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter(
          (subscriber) => subscriber !== event.stream.streamManager
        )
      );
    });

    try {
      await session.connect(webrtc.openviduToken);
      console.log("Session connected successfully");

      const newpublisher = await OV.initPublisher(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: false,
      });

      await session.publish(newpublisher);
      console.log("Publisher created and published successfully");

      setSession(session);
      setMainStreamManager(newpublisher);
      setPublisher(newpublisher);

      console.log("[*]session", session);
      console.log("[*]publisher", newpublisher);

      console.log("[*]subscribers", subscribers);
    } catch (error) {
      console.error("There was an error connecting to the session:", error);
    }
  };

  joinSession();

  return () => {
    if (session) session.disconnect();
  };
}, []);

useEffect(() => {
  console.log("[*] 전체 connectionInfo", connectionInfo);
  console.log("[*] mainStream", mainStreamManager);
  console.log("[*] subscriber", subscriber);
  
  console.log("[*] 전체 subscribers", subscribers);
  console.log("[*] 배포됨 2");
}, [connectionInfo]);
