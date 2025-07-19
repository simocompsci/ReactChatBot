import { useState } from 'react';

function App() {
  const [inputMessage, setInputMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://yourdomain.com",
          "X-Title": "Your App Name",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528:free",
          messages: [
            {
              role: "user",
              content: inputMessage,
            },
          ],
        }),
      });

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "No response";
      setResponseMessage(content);
    } catch (err) {
      setResponseMessage("Error: " + err.message);
    }

    setLoading(false);
    setInputMessage("");
  };

  const formatResponse = (text) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h3 key={index} className="text-purple-600 font-semibold text-lg my-2">
            {line.replace(/\*\*/g, '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        return (
          <li key={index} className="list-disc list-inside text-sm text-gray-300">
            {line.substring(2)}
          </li>
        );
      } else {
        return (
          <p key={index} className="text-gray-300 text-sm leading-relaxed mb-2">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white font-sans">
      <header className="bg-zinc-800 px-6 py-4 shadow-md">
        <h1 className="text-xl font-bold text-purple-500">Modern AI Chatbot</h1>
        <p className="text-sm text-zinc-400">Talk to your assistant</p>
      </header>

      <main className="flex-1 overflow-auto px-6 py-8">
        {responseMessage && (
          <div className="bg-zinc-800 p-5 rounded-2xl shadow-lg border border-zinc-700">
            {formatResponse(responseMessage)}
          </div>
        )}

        {loading && (
          <div className="text-zinc-400 text-sm mt-4 animate-pulse">Thinking...</div>
        )}
      </main>

      <footer className="p-4 bg-zinc-800 border-t border-zinc-700">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-xl bg-zinc-700 text-white placeholder-zinc-400 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 px-5 py-3 rounded-xl hover:bg-purple-700 transition-colors"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
