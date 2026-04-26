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
                
                {/* Search Icon (decorative) */}
                <div className="p-3 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>

                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Ask anything..."
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