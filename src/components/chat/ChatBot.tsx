import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { QuickReply } from './QuickReply';
import type { Message, QuickReplyOption } from '../../types/chat';
import { processMessage } from '../../lib/utils/chatbot';

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: 'Hello! How can I help you today?',
      quickReplies: [
        { label: 'Book Appointment', value: 'book' },
        { label: 'Billing Question', value: 'billing' },
        { label: 'Services Info', value: 'services' },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const response = await processMessage(inputValue);
    setIsTyping(false);
    setMessages((prev) => [...prev, response]);
  };

  const handleQuickReply = async (option: QuickReplyOption) => {
    const userMessage: Message = {
      type: 'user',
      content: option.label,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const response = await processMessage(option.value);
    setIsTyping(false);
    setMessages((prev) => [...prev, response]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-teal-500 text-white rounded-full p-4 shadow-lg hover:bg-teal-600 transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-2rem)] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-teal-500 text-white rounded-t-lg">
            <h3 className="font-semibold">Serenity MedSpa Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                onQuickReplyClick={handleQuickReply}
              />
            ))}
            {isTyping && (
              <div className="flex items-center text-gray-500 text-sm">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-teal-500 text-white rounded-lg px-4 py-2 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}