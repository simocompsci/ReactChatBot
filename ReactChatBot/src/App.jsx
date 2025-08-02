import { useState, useEffect } from 'react';
import "./App.css";

// Components
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import ModelSelector from './components/ModelSelector';
import Settings from './components/Settings';

// Context
import { ConversationProvider, useConversation } from './context/ConversationContext';

// Services
import { sendMessageToAI } from './services/aiService';

function ChatInterface() {
  const {
    conversations,
    activeConversationId,
    activeConversation,
    loading,
    setLoading,
    setActiveConversationId,
    createConversation,
    addMessage,
    updateConversation,
    deleteConversation,
  } = useConversation();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('deepseek/deepseek-r1-0528:free');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('chatSettings');
    return savedSettings ? JSON.parse(savedSettings) : {
      compactMode: false,
      fontSize: 'medium',
      autoScroll: true,
      sendOnEnter: true,
      maxConversations: 25
    };
  });

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message to conversation
    addMessage(message, 'user');
    
    setLoading(true);

    try {
      // Prepare conversation history for API
      const messageHistory = activeConversation?.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })) || [];
      
      // Ensure we have at least the current message in the history
      if (messageHistory.length === 0 || messageHistory[messageHistory.length - 1].role !== 'user') {
        messageHistory.push({ role: 'user', content: message });
      }

      // Send to AI service with selected model
      const aiResponse = await sendMessageToAI(messageHistory, selectedModel);
      
      // Add AI response to conversation
      addMessage(aiResponse, 'assistant');
      
      // Update conversation with model info if it's the first message
      if (activeConversation && activeConversation.messages.length <= 2) {
        updateConversation(activeConversationId, { model: selectedModel });
      }
    } catch (error) {
      addMessage(`Error: ${error.message}`, 'assistant');
      console.error('Failed to get AI response:', error);
    }

    setLoading(false);
  };

  const handleNewChat = () => {
    createConversation({ model: selectedModel });
    setIsMobileSidebarOpen(false);
  };

  // Close mobile sidebar when selecting a conversation
  const handleSelectConversation = (id) => {
    setActiveConversationId(id);
    setIsMobileSidebarOpen(false);
    
    // Update selected model based on conversation if available
    const conversation = conversations.find(conv => conv.id === id);
    if (conversation && conversation.model) {
      setSelectedModel(conversation.model);
    }
  };

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);
  
  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('chatSettings', JSON.stringify(settings));
    
    // Apply settings that affect the DOM
    if (settings.compactMode) {
      document.body.classList.add('compact-mode');
    } else {
      document.body.classList.remove('compact-mode');
    }
    
    document.body.dataset.fontSize = settings.fontSize;
  }, [settings]);

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 font-sans">
      {/* Mobile sidebar backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 lg:relative lg:z-0 transform ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform duration-300 ease-in-out`}>
        <Sidebar 
          conversations={conversations} 
          activeConversation={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewChat={handleNewChat}
          onDeleteConversation={deleteConversation}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-800 to-blue-900 px-6 py-4 shadow-lg flex justify-between items-center">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden mr-4 text-gray-200 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
            <h1 className="text-2xl font-bold text-white">Modern AI Chatbot</h1>
            <p className="text-sm text-blue-100">Your intelligent assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-gray-300 hover:text-white p-2"
              title="Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
            <ModelSelector 
              selectedModel={selectedModel} 
              onSelectModel={setSelectedModel} 
            />
          </div>
          <button
            onClick={handleNewChat}
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-md p-2 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <span className="hidden md:inline">New Chat</span>
          </button>
        </div>
        </header>

        {/* Chat window */}
        <ChatWindow 
          messages={activeConversation?.messages || []} 
          loading={loading}
          autoScroll={settings.autoScroll}
        />

        {/* Chat input */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={loading}
          sendOnEnter={settings.sendOnEnter}
        />
      </div>
      
      {/* Settings Modal */}
      {isSettingsOpen && (
        <Settings
          settings={settings}
          onUpdateSettings={setSettings}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ConversationProvider>
      <ChatInterface />
    </ConversationProvider>
  );
}

export default App;
