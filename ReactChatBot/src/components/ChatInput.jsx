import { useState, useRef, useEffect } from 'react';

function ChatInput({ onSendMessage, disabled, sendOnEnter = true }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  
  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyDown = (e) => {
    // If sendOnEnter is true, send message on Enter (but not with Shift+Enter)
    if (sendOnEnter && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() && !disabled) {
        onSendMessage(message);
        setMessage('');
      }
    }
  };

  return (
    <div className="border-t border-gray-700 bg-gray-800 p-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled}
            rows="1"
            className="flex-1 p-4 rounded-xl bg-gray-700 text-gray-200 placeholder-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-inner resize-none min-h-[60px]"
          />
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-4 rounded-xl hover:from-blue-800 hover:to-blue-950 transition-all duration-200 text-white font-medium shadow-md flex items-center justify-center ${(!message.trim() || disabled) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;