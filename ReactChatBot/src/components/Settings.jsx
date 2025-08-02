import { useState } from 'react';

function Settings({ onClose, settings, onUpdateSettings }) {
  const [localSettings, setLocalSettings] = useState(settings);
  
  const handleChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateSettings(localSettings);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="border-b border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Appearance */}
          <div>
            <h3 className="text-lg font-medium text-blue-300 mb-3">Appearance</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localSettings.compactMode}
                    onChange={(e) => handleChange('compactMode', e.target.checked)}
                    className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-200">Compact Mode</span>
                </label>
                <p className="text-gray-400 text-sm mt-1 ml-6">Reduce spacing and padding in the interface</p>
              </div>
              
              <div>
                <label className="block text-gray-200 mb-2">Font Size</label>
                <select
                  value={localSettings.fontSize}
                  onChange={(e) => handleChange('fontSize', e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Behavior */}
          <div>
            <h3 className="text-lg font-medium text-blue-300 mb-3">Behavior</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localSettings.autoScroll}
                    onChange={(e) => handleChange('autoScroll', e.target.checked)}
                    className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-200">Auto-scroll to bottom</span>
                </label>
                <p className="text-gray-400 text-sm mt-1 ml-6">Automatically scroll to the latest message</p>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localSettings.sendOnEnter}
                    onChange={(e) => handleChange('sendOnEnter', e.target.checked)}
                    className="rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-200">Send on Enter</span>
                </label>
                <p className="text-gray-400 text-sm mt-1 ml-6">Press Enter to send message (Shift+Enter for new line)</p>
              </div>
            </div>
          </div>
          
          {/* Advanced */}
          <div>
            <h3 className="text-lg font-medium text-blue-300 mb-3">Advanced</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-200 mb-2">Max Conversation History</label>
                <select
                  value={localSettings.maxConversations}
                  onChange={(e) => handleChange('maxConversations', Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md text-gray-200 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={10}>10 conversations</option>
                  <option value={25}>25 conversations</option>
                  <option value={50}>50 conversations</option>
                  <option value={100}>100 conversations</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;