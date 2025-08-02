import { createContext, useContext, useState, useEffect } from 'react';

const ConversationContext = createContext();

export function useConversation() {
  return useContext(ConversationContext);
}

export function ConversationProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load conversations from localStorage on initial render
  useEffect(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      try {
        const parsedConversations = JSON.parse(savedConversations);
        setConversations(parsedConversations);
        
        // Set the most recent conversation as active if there is one
        if (parsedConversations.length > 0) {
          setActiveConversationId(parsedConversations[0].id);
        }
      } catch (error) {
        console.error('Failed to parse saved conversations:', error);
      }
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Get the active conversation
  const activeConversation = conversations.find(conv => conv.id === activeConversationId) || null;

  // Create a new conversation
  const createConversation = (metadata = {}) => {
    const newConversation = {
      id: Date.now().toString(),
      title: metadata.title || 'New Chat',
      messages: [],
      timestamp: new Date().toISOString(),
      model: metadata.model || null, // Store the model used for this conversation
      ...metadata // Allow additional metadata to be stored
    };

    setConversations(prevConversations => [newConversation, ...prevConversations]);
    setActiveConversationId(newConversation.id);
    return newConversation.id;
  };

  // Add a message to the active conversation
  const addMessage = (content, role = 'user') => {
    if (!activeConversationId) {
      const newId = createConversation();
      setActiveConversationId(newId);
    }

    const message = { role, content, timestamp: new Date().toISOString() };
    
    setConversations(prevConversations => {
      return prevConversations.map(conv => {
        if (conv.id === activeConversationId) {
          // Update conversation title if it's the first user message
          let updatedTitle = conv.title;
          if (conv.messages.length === 0 && role === 'user') {
            updatedTitle = content.length > 30 ? content.substring(0, 30) + '...' : content;
          }
          
          return {
            ...conv,
            title: updatedTitle,
            messages: [...conv.messages, message],
            timestamp: new Date().toISOString(),
          };
        }
        return conv;
      });
    });

    return message;
  };
  
  // Update conversation properties
  const updateConversation = (id, updates) => {
    setConversations(prevConversations => {
      return prevConversations.map(conv => {
        if (conv.id === id) {
          return {
            ...conv,
            ...updates,
            timestamp: new Date().toISOString(),
          };
        }
        return conv;
      });
    });
  };

  // Delete a conversation
  const deleteConversation = (id) => {
    setConversations(prevConversations => {
      const filtered = prevConversations.filter(conv => conv.id !== id);
      
      // If we're deleting the active conversation, set a new active one
      if (id === activeConversationId && filtered.length > 0) {
        setActiveConversationId(filtered[0].id);
      } else if (filtered.length === 0) {
        setActiveConversationId(null);
      }
      
      return filtered;
    });
  };

  // Clear all conversations
  const clearAllConversations = () => {
    setConversations([]);
    setActiveConversationId(null);
  };

  const value = {
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
    clearAllConversations,
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}