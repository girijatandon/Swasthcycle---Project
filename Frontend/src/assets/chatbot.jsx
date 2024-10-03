import { useState } from "react"; // Only useState is imported
import "./chat.css"; // Ensure the path is correct

function Chat() { // Component name should start with a capital letter
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm here to provide tips for your menstrual cycle. How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    generateBotResponse(userInput);
    setUserInput("");
  };

  const generateBotResponse = (input) => {
    let botMessage = "";

    if (input.toLowerCase().includes("cramps")) {
      botMessage = "For cramps, try using a hot water bottle on your abdomen or drinking ginger tea.";
    } else if (input.toLowerCase().includes("ovulation")) {
      botMessage = "During ovulation, you might experience an increase in energy. It's a great time for physical activities!";
    } else if (input.toLowerCase().includes("period")) {
      botMessage = "It's your period! Make sure to stay hydrated and rest when needed. A warm bath can help relieve discomfort.";
    } else if (input.toLowerCase().includes("fatigue")) {
      botMessage = "Fatigue during your cycle is normal. Ensure you’re getting enough sleep and eating iron-rich foods.";
    } else {
      botMessage = "I'm not sure about that. Could you give me more details about how you're feeling or any symptoms?";
    }

    setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botMessage }]);
  };

  return (
    <div className="App">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === "bot" ? "message bot-message" : "message user-message"}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
