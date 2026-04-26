import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PremiumTypingAnimation = () => {
    return (
        <div className="flex items-center">
            <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDuration: "1s", animationDelay: "0ms" }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDuration: "1s", animationDelay: "300ms" }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"
                    style={{ animationDuration: "1s", animationDelay: "600ms" }}></div>
            </div>
        </div>
    );
};

const SearchStages = ({ searchInfo }: any) => {
    if (!searchInfo || !searchInfo.stages || searchInfo.stages.length === 0) return null;

    return (
        <div className="mb-4 mt-2 relative pl-5">
            {/* Search Process UI */}
            <div className="flex flex-col space-y-4 text-sm text-gray-400 font-medium tracking-wide">
                {/* Searching Stage */}
                {searchInfo.stages.includes('searching') && (
                    <div className="relative">
                        {/* Dot */}
                        <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 bg-gray-500 rounded-full z-10"></div>

                        {/* Connecting line to next item if reading exists */}
                        {searchInfo.stages.includes('reading') && (
                            <div className="absolute -left-[11px] top-4 w-[1px] h-[calc(100%+1rem)] bg-gray-600"></div>
                        )}

                        <div className="flex flex-col">
                            <span className="mb-2 ml-2 text-gray-300 font-semibold uppercase tracking-widest text-xs">Searching the web</span>

                            {/* Search Query in box styling */}
                            <div className="flex flex-wrap gap-2 pl-2 mt-1">
                                <div className="bg-[#0D0D0D] text-gray-300 border border-[#333333] text-xs px-3 py-1.5 rounded-lg inline-flex items-center">
                                    <svg className="w-3 h-3 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                    {searchInfo.query}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reading Stage */}
                {searchInfo.stages.includes('reading') && (
                    <div className="relative">
                        {/* Dot */}
                        <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 bg-gray-500 rounded-full z-10"></div>

                        <div className="flex flex-col">
                            <span className="mb-2 ml-2 text-gray-300 font-semibold uppercase tracking-widest text-xs">Reading</span>

                            {/* Search Results */}
                            {searchInfo.urls && searchInfo.urls.length > 0 && (
                                <div className="pl-2 space-y-2">
                                    <div className="flex flex-col gap-2">
                                        {Array.isArray(searchInfo.urls) ? (
                                            searchInfo.urls.map((url: any, index: number) => (
                                                <div key={index} className="bg-[#0D0D0D] text-gray-300 text-xs px-4 py-2 rounded-lg border border-[#333333] truncate max-w-[250px] transition-colors hover:bg-[#1A1A1A] hover:border-gray-500 cursor-pointer">
                                                    {typeof url === 'string' ? url : JSON.stringify(url).substring(0, 30)}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="bg-[#0D0D0D] text-gray-300 text-xs px-4 py-2 rounded-lg border border-[#333333] truncate max-w-[250px] transition-colors hover:bg-[#1A1A1A] cursor-pointer">
                                                {typeof searchInfo.urls === 'string' ? searchInfo.urls.substring(0, 30) : JSON.stringify(searchInfo.urls).substring(0, 30)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Writing Stage */}
                {searchInfo.stages.includes('writing') && (
                    <div className="relative mt-2">
                        {/* Dot */}
                        <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 bg-gray-400 rounded-full z-10"></div>
                        <span className="ml-2 text-gray-300 font-semibold uppercase tracking-widest text-xs">Writing answer</span>
                    </div>
                )}

                {/* Error Message */}
                {searchInfo.stages.includes('error') && (
                    <div className="relative mt-2">
                        {/* Red dot over the vertical line */}
                        <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 bg-[#E94A6E] rounded-full z-10"></div>
                        <span className="ml-2 text-[#E94A6E] font-semibold uppercase tracking-widest text-xs">Search error</span>
                        <div className="pl-6 text-xs text-[#E94A6E] mt-2 font-medium bg-[#E94A6E]/10 border border-[#E94A6E]/20 p-2 rounded-lg">
                            {searchInfo.error || "An error occurred during search."}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const MessageArea = ({ messages }: any) => {
    return (
        <div className="flex-grow overflow-y-auto px-6 py-6 pb-20 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent custom-scrollbar" style={{ minHeight: 0 }}>
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                {messages.map((message: any) => (
                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} w-full`}>
                        {!message.isUser ? (
                            <div className="flex max-w-[85%] md:max-w-[75%]">
                                <div className="flex-shrink-0 mr-4 mt-auto mb-2">
                                    <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border border-[#333333] shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    {message.searchInfo && (
                                        <SearchStages searchInfo={message.searchInfo} />
                                    )}
                                    <div className="rounded-2xl py-4 px-6 border bg-[#222222] border-[#333333] text-gray-200 rounded-bl-sm text-sm leading-relaxed">
                                        {message.isLoading ? (
                                            <PremiumTypingAnimation />
                                        ) : message.content ? (
                                            <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap prose-p:leading-relaxed prose-pre:bg-[#111111] prose-pre:border prose-pre:border-[#333333] prose-pre:p-4 prose-code:text-[#E2E8F0]">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {message.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            <span className="text-gray-500 italic">Synthesizing response...</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-[85%] md:max-w-[75%]">
                                <div className="rounded-2xl py-4 px-6 border bg-[#2A2A2A] border-[#444444] text-white rounded-br-sm text-sm leading-relaxed whitespace-pre-wrap">
                                    <div className="prose prose-invert prose-sm max-w-none">
                                        <ReactMarkdown>
                                            {message.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageArea;