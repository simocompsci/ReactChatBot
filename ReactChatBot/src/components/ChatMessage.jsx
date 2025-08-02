import Markdown from "marked-react";

function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-3xl`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-4' : 'mr-4'}`}>
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-600' : 'bg-gray-700'}`}>
            {isUser ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
            )}
          </div>
        </div>

        {/* Message content */}
        <div 
          className={`px-4 py-3 rounded-lg ${isUser ? 'bg-blue-700 text-white' : 'bg-gray-800 text-gray-200'}`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : (
            <div id="response" className="markdown-content">
              <Markdown>{message.content}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;