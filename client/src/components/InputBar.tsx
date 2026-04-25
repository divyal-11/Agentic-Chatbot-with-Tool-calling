import { useState } from "react"

interface InputBarProps {
    currentMessage: string;
    setCurrentMessage: (msg: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const InputBar = ({ currentMessage, setCurrentMessage, onSubmit }: InputBarProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(e.target.value)
    }

    return (
        <form onSubmit={onSubmit} className="p-4 md:p-6 bg-transparent">
            {/* Simple Pill Container */}
            <div className="flex items-center bg-[#0D0D0D] rounded-full p-2 border border-[#333333]">
                
                {/* Paperclip Icon */}
                <button
                    type="button"
                    className="p-3 text-gray-400 hover:text-gray-200 transition-colors"
                >
                    <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                    </svg>
                </button>

                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={currentMessage}
                    onChange={handleChange}
                    className="flex-grow px-3 py-2 bg-transparent focus:outline-none text-gray-200 placeholder-gray-500 text-sm"
                />

                {/* Send Button */}
                <button
                    type="submit"
                    className="bg-[#D94F6E] hover:bg-[#C2415D] rounded-full p-2 ml-2 transition-colors flex items-center justify-center w-10 h-10"
                >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </button>
            </div>
        </form>
    )
}

export default InputBar