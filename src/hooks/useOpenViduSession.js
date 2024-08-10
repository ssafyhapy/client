// useOpenViduSession.js
import { useState, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import useRoomStore from "../store/useRoomStore";
import useGameStore from "../store/useGameStore";

const useOpenViduSession = () => {
  // Session 연결 시 필요한 정보를 zustand에서 가져오기
  // webrtc안의 openviduToken을 통해 session을 연결함
  const { webrtc } = useRoomStore();
  const {
    mainStreamManager,
    setMainStreamManager,
    publisher,
    setPublisher,
    subscribers,
    subscriber,
    setSubscriber,
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
        const newSubscriber = session.subscribe(event.stream, undefined);
        console.log("[*] Subscriber created", newSubscriber);
        setSubscriber(newSubscriber);

        newSubscriber.on("videoElementCreated", (event) => {
          console.log("[*]Video Element Created", event.element);
        });
        // const newSubscribers = [...subscribers, subscriber];
        setSubscribers(newSubscriber);
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
        await session.connect(webrtc.openviduToken);
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
      } catch (error) {
        console.error("There was an error connecting to the session:", error);
      }
    };

    joinSession();

    return () => {
      if (session) session.disconnect();
    };
  }, []);

  // pub의 오디오 상태 감지를 위해 이벤트 리스너 추가
  useEffect(() => {
    if (
      publisher &&
      publisher.stream &&
      typeof publisher.stream.on === "function"
    ) {
      publisher.stream.on("streamPropertyChanged", (event) => {
        if (event.changedProperty === "audioActive") {
          const isAudioEnabled = event.newValue;
          console.log(
            `Your microphone is now ${isAudioEnabled ? "enabled" : "disabled"}`
          );
          // publisher 상태 업데이트
          setPublisher({
            ...publisher,
            stream: {
              ...publisher.stream,
              audioActive: isAudioEnabled,
            },
          });
        }
      });
    }
  }, [publisher, setPublisher]);

  // 구독자들의 오디오 상태 감지를 위해 이벤트 리스너 추가
  useEffect(() => {
    subscribers.forEach((subscriber, index) => {
      if (subscriber.stream && typeof subscriber.stream.on === "function") {
        subscriber.stream.on("streamPropertyChanged", (event) => {
          if (event.changedProperty === "audioActive") {
            const isAudioState = event.newValue;
            console.log(
              `Subscriber's microphone is now ${
                isAudioState ? "enabled" : "disabled"
              }`
            );
            // subscribers 상태 업데이트
            setSubscribers(
              subscribers.map((sub, i) =>
                i === index
                  ? {
                    // 기존 sub 객체 복사
                      ...sub,
                      stream: {
                        // 기존의 스트림을 복사
                        ...sub.stream,
                        // audioActive 속성을 업데이트
                        audioActive: isAudioState,
                      },
                    }
                    // 인덱스가 일치하지 않는 구독자는 기존 상태 유지
                  : sub
              )
            );
          }
        });
      }
    });
  }, [subscribers, setSubscribers]);

  useEffect(() => {
    console.log("[*] 전체 connectionInfo", connectionInfo);
    console.log("[*] publisher", publisher);

    console.log("[*] mainStream", mainStreamManager);
    console.log("[*] newSubscriber", subscriber);

    console.log("[*] subscribers", subscribers);
    console.log("[*] 배포됨 1");
  }, [subscribers, connectionInfo, publisher, mainStreamManager, subscriber]);

  return { session };
};

export default useOpenViduSession;
