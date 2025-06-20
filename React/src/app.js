import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Update chat history with user's message
    setChatHistory([...chatHistory, { message: userInput, fromUser: true }]);
    setUserInput('');

    try {
      // Send user's message to Flask backend
      const response = await axios.post('http://localhost:5000/chat', { question: userInput }, { withCredentials: true });

      // Update chat history with server's response
      setChatHistory([...chatHistory, { message: response.data.answer, fromUser: false }]);
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`message ${chat.fromUser ? 'user' : 'ai'}`}>
              {chat.message}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
