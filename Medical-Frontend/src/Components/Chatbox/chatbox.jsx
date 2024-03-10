import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../Chatbox/chatbox.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [inputLanguage, setInputLanguage] = useState("en-US");
  const [listening, setListening] = useState(false);
  const chatboxRef = useRef(null);
  const recognition = useRef(
    window.SpeechRecognition || window.webkitSpeechRecognition
  );
  const synthesis = useRef(window.speechSynthesis);
  const { user } = useSelector((state) => state.user);

  const { parameter } = useParams();

  const isSpeechRecognitionAvailable = recognition.current !== undefined;

  useEffect(() => {
    if (user) {
      const welcomeMessage = `Welcome ${user?.fname}, how may I help you`;
      const userMessage = { text: welcomeMessage, user: false };
      setMessages([userMessage]);

      speak(welcomeMessage);
    }
  }, [user]);

  const handleInputMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmitMessage = async () => {
    if (inputMessage.trim() === "") return;

    const userMessage = { text: inputMessage, user: true };
    setMessages([...messages, userMessage]);
    setInputMessage("");

    try {
      const res = await axios.post("http://localhost:8000/chatAPI", {
        user: inputMessage,
      });
      const botResponse = res.data["bot"];

      const delayBotResponse = (botResponse) => {
        const botMessage = { text: botResponse, user: false };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        speak(botResponse);
      };

      setTimeout(() => delayBotResponse(botResponse), 1000);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitMessage();
    }
  };

  const handleSpeechRecognition = () => {
    if (isSpeechRecognitionAvailable) {
      const recognitionInstance = new recognition.current();

      recognitionInstance.lang = inputLanguage;
      recognitionInstance.continuous = true;

      recognitionInstance.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setInputMessage((prevInput) => prevInput + " " + spokenText);

        if (spokenText.toLowerCase().includes("send the message")) {
          handleSubmitMessage();
        }

        recognitionInstance.stop();

        setListening(false);
      };

      setListening((prevState) => !prevState);

      if (!listening) {
        recognitionInstance.start();
      } else {
        recognitionInstance.stop();
      }
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synthesis.current.speak(utterance);
  };

  const changeLangaugae = (e) => {
    const value = e.target.value;
    setInputLanguage(value);
  };

  useEffect(() => {
    // Scroll to the bottom of the chatbox when new messages are added
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chatbot_body">
      <div className="chatbot-container">
        <div className="chatbox" ref={chatboxRef}>
          {/* {user ? (
            <span className="message bot">Welcome, how may i help you</span>
          ) : (
            <></>
          )} */}
          {messages.map((message, index) => (
            <span
              key={index}
              className={`message ${message.user ? "user" : "bot"}`}
            >
              {message.text}
            </span>
          ))}
        </div>
        <div className="input-container">
          <select className="selection-button" onChange={changeLangaugae}>
            <option value="en-US">English</option>
            <option value="ta-IN">Tamil</option>
            <option value="te-IN">Telugu</option>
            <option value="hi-IN">Hindi</option>
            <option value="ml-IN">Malayalam</option>
          </select>
          <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputMessageChange}
            onKeyPress={handleKeyPress}
            className="input-field"
          />
          <button onClick={handleSubmitMessage} className="send-button">
            Send
          </button>
          <button
            onClick={handleSpeechRecognition}
            className="voice-assistant-button"
          >
            {listening ? "Listening..." : "Speak !"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
