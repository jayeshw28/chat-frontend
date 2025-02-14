export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'server';
    timestamp: Date;
  }
  
  export interface ChatSession {
    id: string;
    messages: Message[];
    createdAt: Date;
  }