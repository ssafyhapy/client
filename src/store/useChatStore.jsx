// src/store/chatStore.js
import {create} from "zustand";

const useChatStore = create((set) => ({
  messages: [],

  addMessage: (newMessage) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
    })),

  clearMessages: () => set({ messages: [] }),
}));

export default useChatStore;
