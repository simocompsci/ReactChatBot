# Modern AI Chatbot

A feature-rich React chatbot application with a sleek dark mode UI, conversation history, model selection, and customizable settings.

![Modern AI Chatbot Screenshot](https://via.placeholder.com/800x450/1a202c/3b82f6?text=Modern+AI+Chatbot)

## Features

- 🌙 **Dark Mode UI**: Sleek, modern interface with dark theme
- 💬 **Conversation Management**: Create, save, and manage multiple conversations
- 🤖 **Model Selection**: Choose from different AI models via OpenRouter API
- ⚙️ **Customizable Settings**: Adjust UI density, font size, and behavior
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Real-time Responses**: Smooth interaction with loading indicators
- 📝 **Markdown Support**: Rich text formatting in AI responses

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenRouter API key (get one at [openrouter.ai](https://openrouter.ai/keys))

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/modern-ai-chatbot.git
   cd modern-ai-chatbot
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory (copy from `.env.example`)
   ```
   VITE_API_KEY=your_openrouter_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

### Creating a New Chat

- Click the "New Chat" button in the header or sidebar
- Start typing your message in the input field at the bottom
- Press Enter or click the send button to submit your message

### Managing Conversations

- All conversations are saved automatically in the sidebar
- Click on any conversation in the sidebar to switch to it
- Hover over a conversation and click the trash icon to delete it

### Changing AI Models

- Click the model selector dropdown in the header
- Choose from available models (requires valid API key)
- The selected model will be used for the current conversation

### Customizing Settings

- Click the settings icon in the header
- Adjust UI density, font size, and behavior options
- Settings are saved automatically and applied immediately

## Project Structure

```
/src
  /components       # UI components
  /context          # React context providers
  /services         # API services
  /utils            # Helper functions
  App.jsx           # Main application component
  App.css           # Global styles
  main.jsx          # Entry point
```

## Technologies Used

- **React**: UI library
- **Tailwind CSS**: Styling
- **Vite**: Build tool
- **OpenRouter API**: AI model access

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenRouter for providing access to various AI models
- The React and Tailwind CSS communities for excellent documentation
