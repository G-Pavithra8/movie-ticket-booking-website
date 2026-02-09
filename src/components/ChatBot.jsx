import React, { useState } from 'react';
import { chatbotData } from '../data/chatbotData';
import { FaRobot } from 'react-icons/fa';


const initialMessages = [
  { sender: 'bot', text: 'Hi 👋 How can I help you today?' }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [step, setStep] = useState('category');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openChat = () => {
    setIsOpen(true);
    setMessages(initialMessages);
    setStep('category');
    setSelectedCategory(null);
  };

  const closeChat = () => {
    setIsOpen(false);
    setMessages(initialMessages); // 🔁 reset chat
    setStep('category');
    setSelectedCategory(null);
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setStep('questions');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: cat.category }
    ]);
  };

  const handleQuestionClick = (q) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: q.q },
      { sender: 'bot', text: q.a },
      { sender: 'bot', text: 'Need more help? 😊' }
    ]);
    setStep('help');
  };

  const showCategoriesAgain = () => {
    setStep('category');
  };

  return (
    <>
      {/* 🤖 Chat Icon */}
     {!isOpen && (
  <div className="fixed bottom-6 right-6 flex flex-col items-center gap-2 z-50">
    
   {/* Hi Bubble */}
<div className="relative animate-bounce">
  <div className="bg-[#e50914] text-white text-xs px-3 py-1 rounded-full shadow-lg">
    Hi there 👋
  </div>

  {/* small arrow */}
  <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-[#e50914] rotate-45 -translate-x-1/2"></div>
</div>


    {/* Robot circle button */}
    <button
      onClick={openChat}
      className="w-14 h-14 bg-[#e50914] rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition"
    >
      <FaRobot size={24} className="text-white" />
    </button>

  </div>
)}

      {/* 💬 Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-[420px] bg-white shadow-2xl rounded-xl flex flex-col">
          
          {/* Header */}
          <div className="bg-[#e50914] text-white p-3 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold">MovieBot 🎬</span>
            <button onClick={closeChat} className="text-xl font-bold">
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-gray-200 ml-auto'
                    : 'bg-pink-100'
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Categories */}
            {step === 'category' &&
              chatbotData.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => handleCategoryClick(cat)}
                  className="w-full text-left p-2 border rounded-lg hover:bg-gray-100"
                >
                  {cat.category}
                </button>
              ))}

            {/* Questions */}
            {step === 'questions' &&
              selectedCategory.questions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuestionClick(q)}
                  className="w-full text-left p-2 border rounded-lg hover:bg-gray-100"
                >
                  {q.q}
                </button>
              ))}

            {/* Help */}
            {step === 'help' && (
              <button
                onClick={showCategoriesAgain}
                className="w-full p-2 bg-[#e50914] text-white rounded-lg"
              >
                🔄 Yes, I need more help
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
