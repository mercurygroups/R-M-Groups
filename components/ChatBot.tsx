
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { getTravelAdvice } from '../geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your R&M Groups Travel Assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await getTravelAdvice(userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-[350px] md:w-[400px] h-[500px] rounded-3xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="font-bold">Travel Assistant</h4>
                <p className="text-[10px] opacity-80 uppercase tracking-wider">Online | R&M Groups</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start max-w-[85%] space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-full mt-1 ${msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-500 shadow-sm'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin text-blue-600" />
                  <span className="text-xs text-gray-400">Assistant is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2">
            <input 
              type="text"
              placeholder="Ask about flights, visas, rentals..."
              className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-95 group"
        >
          <div className="relative">
            <MessageCircle size={32} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
            </span>
          </div>
          <span className="absolute right-20 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            How can we help?
          </span>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
