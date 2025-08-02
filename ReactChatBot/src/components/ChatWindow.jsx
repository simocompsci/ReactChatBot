import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

function ChatWindow({ messages, loading, autoScroll = true }) {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change if autoScroll is enabled
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <div className="bg-blue-700 rounded-full p-3 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-200 mb-2">How can I help you today?</h2>
          <p className="text-gray-400 max-w-xl">
            Ask me anything - from coding questions to creative writing, data analysis, or just casual conversation.
          </p>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {loading && (
            <div className="flex items-center space-x-2 py-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600 animate-bounce delay-100"></div>
              <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce delay-200"></div>
              <span className="text-blue-400 ml-2">Thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}

export default ChatWindow;