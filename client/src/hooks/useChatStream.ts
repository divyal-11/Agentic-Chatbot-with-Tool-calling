import { useState } from 'react';

export interface SearchInfo {
  stages: string[];
  query: string;
  urls: string[];
  error?: string;
}

export interface Message {
  id: number;
  content: string;
  isUser: boolean;
  type: string;
  isLoading?: boolean;
  searchInfo?: SearchInfo;
}

export const useChatStream = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: 'Hi there, how can I help you?',
      isUser: false,
      type: 'message'
    }
  ]);
  const [checkpointId, setCheckpointId] = useState<string | null>(null);

  const sendMessage = async (userInput: string) => {
    // First add the user message to the chat
    const newMessageId = messages.length > 0 ? Math.max(...messages.map(msg => msg.id)) + 1 : 1;

    setMessages(prev => [
      ...prev,
      {
        id: newMessageId,
        content: userInput,
        isUser: true,
        type: 'message'
      }
    ]);

    try {
      // Create AI response placeholder
      const aiResponseId = newMessageId + 1;
      setMessages(prev => [
        ...prev,
        {
          id: aiResponseId,
          content: "",
          isUser: false,
          type: 'message',
          isLoading: true,
          searchInfo: {
            stages: [],
            query: "",
            urls: []
          }
        }
      ]);

      // Create URL and request body
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const url = `${baseUrl}/chat_stream`;
      const requestBody = {
        message: userInput,
        checkpoint_id: checkpointId || undefined
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.body) throw new Error("No response body stream");

      let streamedContent = "";
      let searchData: SearchInfo | null = null;
      let hasReceivedContent = false;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() || ""; // Keep the last incomplete chunk

        for (const event of events) {
          if (!event.startsWith('data: ')) continue;
          
          try {
            const dataStr = event.slice(6); // remove 'data: '
            const data = JSON.parse(dataStr);

            if (data.type === 'checkpoint') {
              setCheckpointId(data.checkpoint_id);
            }
            else if (data.type === 'content') {
              streamedContent += data.content;
              hasReceivedContent = true;

              setMessages(prev =>
                prev.map(msg =>
                  msg.id === aiResponseId
                    ? { ...msg, content: streamedContent, isLoading: false }
                    : msg
                )
              );
            }
            else if (data.type === 'search_start') {
              const newSearchInfo: SearchInfo = {
                stages: ['searching'],
                query: data.query,
                urls: []
              };
              searchData = newSearchInfo;

              setMessages(prev =>
                prev.map(msg =>
                  msg.id === aiResponseId
                    ? { ...msg, content: streamedContent, searchInfo: newSearchInfo, isLoading: false }
                    : msg
                )
              );
            }
            else if (data.type === 'search_results') {
              try {
                const urls = typeof data.urls === 'string' ? JSON.parse(data.urls) : data.urls;
                const newSearchInfo: SearchInfo = {
                  stages: searchData ? [...searchData.stages, 'reading'] : ['reading'],
                  query: searchData?.query || "",
                  urls: urls
                };
                searchData = newSearchInfo;

                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === aiResponseId
                      ? { ...msg, content: streamedContent, searchInfo: newSearchInfo, isLoading: false }
                      : msg
                  )
                );
              } catch (err) {
                console.error("Error parsing search results:", err);
              }
            }
            else if (data.type === 'search_error') {
              const newSearchInfo: SearchInfo = {
                stages: searchData ? [...searchData.stages, 'error'] : ['error'],
                query: searchData?.query || "",
                error: data.error,
                urls: []
              };
              searchData = newSearchInfo;

              setMessages(prev =>
                prev.map(msg =>
                  msg.id === aiResponseId
                    ? { ...msg, content: streamedContent, searchInfo: newSearchInfo, isLoading: false }
                    : msg
                )
              );
            }
            else if (data.type === 'error') {
               // Handle backend errors nicely
               setMessages(prev =>
                 prev.map(msg =>
                   msg.id === aiResponseId
                     ? { ...msg, content: streamedContent || data.message, isLoading: false, type: 'error' }
                     : msg
                 )
               );
               break;
            }
            else if (data.type === 'end') {
              if (searchData) {
                const finalSearchInfo = {
                  ...searchData,
                  stages: [...searchData.stages, 'writing']
                };

                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === aiResponseId
                      ? { ...msg, searchInfo: finalSearchInfo, isLoading: false }
                      : msg
                  )
                );
              }
            }
          } catch (error) {
            console.error("Error parsing event data:", error, event);
          }
        }
      }
    } catch (error) {
      console.error("Error setting up fetch stream:", error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          content: "Sorry, there was an error connecting to the server.",
          isUser: false,
          type: 'error',
          isLoading: false
        }
      ]);
    }
  };

  return { messages, sendMessage };
};
