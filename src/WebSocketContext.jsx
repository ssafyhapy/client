// src/WebSocketContext.jsx
import React, { createContext, useContext, useEffect } from 'react';
import webSocketService from './WebSocketService';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  useEffect(() => {
    // Connect the WebSocket when the provider is mounted
    webSocketService.connect(() => {
      console.log('WebSocket connected');
    });

    // Deactivate the WebSocket when the provider is unmounted
    return () => {
      webSocketService.deactivate();
      console.log('WebSocket disconnected');
    };
  }, []);

  return (
    <WebSocketContext.Provider value={webSocketService}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
