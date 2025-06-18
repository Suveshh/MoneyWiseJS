import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader, X, Minimize2, Maximize2 } from "lucide-react";
import { geminiAPI } from "../../lib/gemini";
import { motion, AnimatePresence } from "framer-motion";

const AIChat = ({ isOpen, onClose, isMinimized, onToggleMinimize }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content:
        "Hello! I'm your AI investment assistant. I can help you understand financial concepts, analyze market trends, and answer your investing questions. What would you like to learn about today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  console.log("Gemini API Key:", geminiAPI.apiKey ? "[Loaded]" : "[Missing]");

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const prompt = `You are a helpful AI investment assistant for MoneyWise, an educational platform. 
      Answer this question about investing/finance in a clear, educational way: ${inputValue}
      Keep your response concise but informative, suitable for students learning about investing.`;

      const response = await geminiAPI.generateContent(prompt);

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`fixed bottom-4 right-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        } transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2.5 ">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                AI Assistant
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleMinimize}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
              ) : (
                <Minimize2 className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
            >
              <X className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[480px] border-t border-neutral-200 dark:border-neutral-700">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.sender === "user"
                          ? "bg-primary-600"
                          : "bg-neutral-200 dark:bg-neutral-700"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="h-3 w-3 text-white" />
                      ) : (
                        <Bot className="h-3 w-3 text-neutral-600 dark:text-neutral-400" />
                      )}
                    </div>
                    <div
                      className={`px-3 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-primary-600 text-white"
                          : "bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-white"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-primary-200"
                            : "text-neutral-500 dark:text-neutral-400"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div className="bg-neutral-100 dark:bg-neutral-700 px-3 py-2 rounded-lg">
                      <div className="flex items-center space-x-1">
                        <Loader className="h-3 w-3 animate-spin text-neutral-600 dark:text-neutral-400" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-1.5 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me about investing..."
                  className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 dark:disabled:bg-neutral-600 text-white rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AIChat;
