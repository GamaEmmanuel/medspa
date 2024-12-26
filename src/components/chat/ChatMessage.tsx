import React from 'react';
import { User, Bot } from 'lucide-react';
import { QuickReply } from './QuickReply';
import type { Message, QuickReplyOption } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
  onQuickReplyClick: (option: QuickReplyOption) => void;
}

export function ChatMessage({ message, onQuickReplyClick }: ChatMessageProps) {
  const isBot = message.type === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div
          className={`flex items-center justify-center h-8 w-8 rounded-full ${
            isBot ? 'bg-teal-100 text-teal-600 mr-2' : 'bg-gray-100 text-gray-600 ml-2'
          }`}
        >
          {isBot ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
        </div>
        <div>
          <div
            className={`rounded-lg px-4 py-2 ${
              isBot
                ? 'bg-teal-100 text-gray-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {message.content}
          </div>
          {message.quickReplies && (
            <div className="mt-2 flex flex-wrap gap-2">
              {message.quickReplies.map((option, index) => (
                <QuickReply
                  key={index}
                  option={option}
                  onClick={() => onQuickReplyClick(option)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}