/**
 * Service for interacting with the AI API
 */

// Get API key from environment variables
const apiKey = import.meta.env.VITE_API_KEY;

/**
 * Send a message to the AI and get a response
 * @param {Array} messages - Array of message objects with role and content
 * @param {string} model - The model ID to use for generation
 * @returns {Promise<Object>} - The AI response
 */
export async function sendMessageToAI(messages, model = "deepseek/deepseek-r1-0528:free") {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://yourdomain.com",
        "X-Title": "Modern AI Chatbot",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from AI');
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Error sending message to AI:', error);
    throw error;
  }
}

/**
 * Get available AI models from the API
 * @returns {Promise<Array>} - List of available models
 */
export async function getAvailableModels() {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://yourdomain.com",
        "X-Title": "Modern AI Chatbot",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch available models');
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}