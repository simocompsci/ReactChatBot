import { useState } from 'react';
import { formatDate } from '../utils/helpers';

function Sidebar({ conversations, activeConversation, onSelectConversation, onNewChat, onDeleteConversation }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div 
      className={`bg-gray-900 border-r border-gray-700 h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} flex flex-col`}
    >
      {/* Header with new chat button */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-white">Chats</h2>
        )}
        <div className="flex items-center">
          <button
            onClick={onNewChat}
            className="bg-blue-700 hover:bg-blue-800 text-white rounded-md p-2 flex items-center justify-center"
            title="New Chat"
          >
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Chat
              </>
            )}
          </button>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-2 text-gray-400 hover:text-white p-1 rounded-md"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto py-2">
        {conversations.length === 0 ? (
          <div className="text-center py-8 text-gray-400 px-4">
            {!isCollapsed && "No conversations yet. Start a new chat!"}
          </div>
        ) : (
          conversations.map((conversation) => (
            <div 
              key={conversation.id}
              className={`group relative px-4 py-3 ${activeConversation === conversation.id ? 'bg-gray-800' : 'hover:bg-gray-800'} transition-colors duration-200`}
            >
              <button
                onClick={() => onSelectConversation(conversation.id)}
                className="w-full text-left flex items-center"
              >
                <div className="text-blue-400 mr-3 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                {!isCollapsed && (
                  <div className="truncate flex-1">
                    <div className="font-medium text-gray-200 truncate">{conversation.title}</div>
                    <div className="flex items-center text-xs">
                      {conversation.model && (
                        <span className="text-blue-400 mr-2">
                          {conversation.model.split('/').pop().split(':')[0]}
                        </span>
                      )}
                      <span className="text-gray-400">{formatDate(conversation.timestamp)}</span>
                    </div>
                  </div>
                )}
              </button>
              
              {!isCollapsed && onDeleteConversation && (
                <button 
                  onClick={() => onDeleteConversation(conversation.id)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  title="Delete conversation"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;