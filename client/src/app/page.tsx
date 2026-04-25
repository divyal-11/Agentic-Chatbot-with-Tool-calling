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
    <div className="h-screen w-screen flex justify-center items-center py-4 px-4 md:py-8 md:px-10 overflow-hidden bg-[#0D0D0D]">
      {/* Main layout container - 2 columns */}
      <div className="flex flex-row w-full max-w-[1400px] h-full max-h-[90vh] gap-6">
        
        {/* Left: Main Chat Stream */}
        <div 
            className="flex-grow flex flex-col relative rounded-[1.5rem] overflow-hidden shadow-lg border border-[#333333]"
            style={{ backgroundImage: "url('/no shit.jpeg')", backgroundSize: "cover", backgroundPosition: "center" }}
        >
            {/* Dark gradient/blur overlay for readability */}
            <div className="absolute inset-0 bg-[#0D0D0D]/80 backdrop-blur-[2px] z-0"></div>
            
            <div className="relative z-10 flex flex-col h-full">
                <Header />
                <MessageArea messages={messages} />
                <InputBar currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} onSubmit={handleSubmit} />
            </div>
        </div>

        {/* Right: Vertical Image Panel */}
        <div className="w-[350px] lg:w-[450px] hidden md:flex rounded-[1.5rem] overflow-hidden border border-[#333333] shadow-lg bg-[#1A1A1A] relative flex-shrink-0">
            <img 
              src="/image.png" 
              alt="Creative Visual" 
              className="w-full h-full object-cover"
            />
        </div>

      </div>
    </div>
  );
};

export default Home;