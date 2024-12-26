import React from 'react';
import type { QuickReplyOption } from '../../types/chat';

interface QuickReplyProps {
  option: QuickReplyOption;
  onClick: () => void;
}

export function QuickReply({ option, onClick }: QuickReplyProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-teal-200 text-teal-600 rounded-full px-4 py-1 text-sm hover:bg-teal-50 transition-colors"
    >
      {option.label}
    </button>
  );
}