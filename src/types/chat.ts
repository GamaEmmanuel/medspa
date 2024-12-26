export interface QuickReplyOption {
  label: string;
  value: string;
}

export interface Message {
  type: 'user' | 'bot';
  content: string;
  quickReplies?: QuickReplyOption[];
}

export interface ChatResponse {
  content: string;
  quickReplies?: QuickReplyOption[];
}