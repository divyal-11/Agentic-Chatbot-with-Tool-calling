"use client"

import Header from '@/components/Header';
import InputBar from '@/components/InputBar';
import MessageArea from '@/components/MessageArea';
import React, { useState } from 'react';
import { useChatStream } from '@/hooks/useChatStream';

const Home = () => {
  const { messages, sendMessage } = useChatStream();
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      const userInput = currentMessage;
      setCurrentMessage(""); // Clear input field immediately
      await sendMessage(userInput);
    }
  };

  return (
    <div 
      className="h-screen w-screen flex justify-center items-center py-4 px-4 md:py-8 md:px-10 overflow-hidden"
      style={{ backgroundImage: "url('/ai-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Subtle dark overlay for readability */}
      <div className="absolute inset-0 bg-[#0D0D0D]/70 z-0"></div>

      {/* Main Chat Container - Full width, centered */}
      <div 
        className="relative z-10 flex flex-col w-full max-w-[900px] h-full max-h-[90vh] rounded-[1.5rem] overflow-hidden shadow-2xl border border-[#333333] bg-[#0D0D0D]/60 backdrop-blur-xl"
      >
        <Header />
        <MessageArea messages={messages} />
        <InputBar currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Home;