import { useState, useEffect } from 'react';
import { getAvailableModels } from '../services/aiService';

function ModelSelector({ selectedModel, onSelectModel }) {
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Default model if none is selected
  const defaultModel = {
    id: 'deepseek/deepseek-r1-0528:free',
    name: 'Deepseek R1',
  };

  // Load available models on component mount
  useEffect(() => {
    async function loadModels() {
      setIsLoading(true);
      try {
        const availableModels = await getAvailableModels();
        if (availableModels.length > 0) {
          // Format models for display
          const formattedModels = availableModels.map(model => ({
            id: model.id,
            name: model.name || model.id.split('/').pop(),
            description: model.description || '',
          }));
          setModels(formattedModels);
        }
      } catch (error) {
        console.error('Failed to load models:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadModels();
  }, []);

  // Get current model display name
  const getCurrentModelName = () => {
    if (!selectedModel) return defaultModel.name;
    const model = models.find(m => m.id === selectedModel);
    return model ? model.name : selectedModel.split('/').pop();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-2 rounded-md text-sm transition-colors duration-200"
      >
        <span className="mr-1">Model:</span>
        <span className="font-medium">{getCurrentModelName()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
          <div className="py-1">
            {isLoading ? (
              <div className="px-4 py-2 text-gray-400 text-sm">Loading models...</div>
            ) : models.length > 0 ? (
              models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    onSelectModel(model.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm ${selectedModel === model.id ? 'bg-blue-700 text-white' : 'text-gray-200 hover:bg-gray-700'}`}
                >
                  <div className="font-medium">{model.name}</div>
                  {model.description && (
                    <div className="text-xs text-gray-400 truncate">{model.description}</div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-400 text-sm">No models available</div>
            )}
            <div className="border-t border-gray-700 mt-1 pt-1">
              <button
                onClick={() => {
                  onSelectModel(defaultModel.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm ${selectedModel === defaultModel.id ? 'bg-blue-700 text-white' : 'text-gray-200 hover:bg-gray-700'}`}
              >
                <div className="font-medium">{defaultModel.name} (Default)</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModelSelector;