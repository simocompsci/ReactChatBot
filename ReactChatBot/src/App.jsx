import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [showResponse, setShowResponse] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  const sendMessage = async () => {
    if (!inputMessage) {
      setResponseMessage("Please enter some input!");
      return;
    }

    setResponseMessage("Loading...");
    setErrorMessage("");
    setShowResponse(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "<YOUR_SITE_URL>",
          "X-Title": "<YOUR_SITE_NAME>",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1-0528:free",
          "messages": [{
            "role": "user",
            "content": inputMessage
          }]
        })
      });

      const data = await response.json();
      console.log(data);
      const messageContent = data.choices?.[0]?.message?.content || "No response";
      setResponseMessage(messageContent);

      // If you want to see the response, either:
      // or
      setTimeout(() => console.log(responseMessage), 0); // after state update

    } catch (error) {
      setErrorMessage("Error: " + error.message);
      console.error("Error:", error);
    }
  };

  

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4 sm:p-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-white">AI Assistant</h1>
            <p className="text-gray-400 text-xs sm:text-sm">Powered by advanced AI • Always here to help</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* User Message */}
        {inputMessage && showResponse && (
          <div className="flex justify-end">
            <div className="bg-purple-600 text-white p-3 sm:p-4 rounded-2xl rounded-tr-none max-w-[80%]">
              <p className="text-sm sm:text-base leading-relaxed">{inputMessage}</p>
            </div>
          </div>
        )}

        {/* AI Response */}
        {showResponse && (
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold text-xs sm:text-sm">
              AI
            </div>
            <div className="bg-gray-700 text-gray-100 p-3 sm:p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[90%] sm:max-w-[80%]">
              <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                {responseMessage.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {!showResponse && inputMessage && (
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-purple-600 text-white flex items-center justify-center rounded-full font-bold text-xs sm:text-sm">
              AI
            </div>
            <div className="bg-gray-700 text-gray-100 p-3 sm:p-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 sm:p-6 bg-gray-800 border-t border-gray-700 flex-shrink-0">
        <div className="flex gap-2 sm:gap-3">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message... (Press Enter to send)"
            className="flex-1 p-3 sm:p-4 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 text-white p-3 sm:px-6 sm:py-4 rounded-xl font-medium hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            aria-label="Send message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  );
}

export default App
