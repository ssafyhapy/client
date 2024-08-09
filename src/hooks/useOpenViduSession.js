// useOpenViduSession.js
import { useState, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import { useRoomStore } from "../store/useRoomStore";
import { useGameStore } from "../store/useGameStore";

const useOpenViduSession = ({}) => {
  // Session 연결 시 필요한 정보를 zustand에서 가져오기
  // webrtc안의 openviduToken을 통해 session을 연결함
  const { webrtc } = useRoomStore();
  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    setSubscribers,
    connectionInfo,
    setConnectionInfo,
  } = useGameStore();

  // 1. session을 연결하고(session.connect)
  // 2. 켜졌을 때 할 액션들을 조건을 설정할 수 있음 (session.on)
  // 3. session에 로컬 스트림을 공유하기 위해 publish할 수 있음(session.publish)
  // 4. session을 통해 다른 사람들의 스트림을 공유 받기 위해 subscribe를 할 수 있음 (session.subscribe)

  // session을 저장한다.
  const [session, setSession] = useState(null);

  // 처음 마운트 되면 useEffect를 통해서 OpenVidu의 기능을 통해 session을 pub하고 sub하고 각종 정보를 받아온다.
  useEffect(() => {
    const OV = new OpenVidu();

    // session을 join할 때 해야하는 작업들을 연결한다.
    const joinSession = async () => {
      const session = OV.initSession();

      session.on("streamCreated", (event) => {
        // session에 연결하여 현재 사용자를 session에 구독시키고 비디오를 생성한다.
        const subscriber = session.subscribe(event.stream, undefined);
        console.log("[*] Subscriber created", subscriber);

        // 현재 사용자의 비디오가 생성되면 비디오를 확인한다.
        subscriber.on("videoElementCreated", (event) => {
          console.log("[*] Video Element Created", event.element);
        });
        // 과거 구독자 명단과 현재 사용자가 구독하여 생성된 구독자 객체를 배열로 합친다.
        setSubscribers((prev) => [...prev, subscriber]);
      });

    //   session이 연결되면 connection 정보를 parsing하여 각 객체의 정보를 저장한다.
      session.on("connectionCreated", (event) => {
        console.log("[*] connection", event.connection);
        const connectionData = JSON.parse(event.connection.data);
        const newConnectionData = {
          connectionId: event.connection.connectionId,
          memberName: connectionData.memberName,
          memberId: connectionData.memberId,
        };
        setConnectionInfo(newConnectionData);
      });

    //  만약 특정 구독자가 방에서 나가거나 그 사람의 stream을 삭제 시킨다. (오픈비두의 자동 기능)
      session.on("streamDestroyed", (event) => {
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter(
            (subscriber) => subscriber !== event.stream.streamManager
          )
        );
      });


      try {
        // 세션 연결 시도
        await session.connect(webrtcToken);
        console.log("Session connected successfully");

        // 로컬 스트림 생성
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

        // 로컬 스트림 공개
        await session.publish(newpublisher);
        console.log("Publisher created and published successfully");

        // Session, MainStreamManager, Publisher, Subscriber를 업데이트함
        setSession(session);
        setMainStreamManager(newpublisher);
        setPublisher(newpublisher);
        setSubsriber
      } catch (error) {
        console.error("There was an error connecting to the session:", error);
      }
    };

    joinSession();

    return () => {
      if (session) session.disconnect();
    };
  }, [webrtcToken]);

  useEffect(() => {
    console.log("[*] 전체 connectionInfo", connectionInfo);
    console.log("[*] mainStream", mainStreamManager);
    console.log("[*] subscriber", subscriber);
    
    console.log("[*] 전체 subscribers", subscribers);
    console.log("[*] 배포됨 1");
  }, [connectionInfo]);

  return { session };
};

export default useOpenViduSession;
