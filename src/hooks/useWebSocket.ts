import { Message } from '@/types/chat';
import { useEffect, useCallback, useRef } from 'react';

export function useWebSocket(onMessage: (message: Message) => void) {
  const ws = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const token = localStorage.getItem('token');
    ws.current = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:1337'}?token=${token}`);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setTimeout(connect, 5000);
    };
  }, [onMessage]);

  const sendMessage = useCallback((content: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ content }));
    }
  }, []);

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close();
    };
  }, [connect]);

  return { sendMessage };
}
