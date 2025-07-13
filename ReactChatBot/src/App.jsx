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
      const messageContent = data.choices?.[0]?.message?.content || "No response";
      setResponseMessage(messageContent);

      // If you want to see the response, either:
      console.log(messageContent); // or
      setTimeout(() => console.log(responseMessage), 0); // after state update

    } catch (error) {
      setErrorMessage("Error: " + error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-xl p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">AI ChatBot</h1>

        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-4"
        />

        <button
          onClick={sendMessage}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          Send
        </button>

        {showResponse && (
          <div className="flex items-start gap-3 mt-4">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-full font-bold">
              AI
            </div>
            <div className="bg-gray-100 text-gray-800 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-full whitespace-pre-wrap leading-relaxed">
              {responseMessage}
            </div>
          </div>

        )}
      </div>
    </div>
  );
}

export default App
