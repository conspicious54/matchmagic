import { EventEmitter } from 'events';

export interface TrainingUpdate {
  type: 'progress' | 'completion' | 'error';
  progress?: number;
  message?: string;
  error?: string;
  modelId?: string;
}

class WebSocketService extends EventEmitter {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout = 1000; // Start with 1 second

  constructor() {
    super();
    this.connect();
  }

  private connect() {
    try {
      this.ws = new WebSocket('ws://34.23.189.171:8188/ws');

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.reconnectAttempts = 0;
        this.reconnectTimeout = 1000;
        this.emit('connected');
      };

      this.ws.onmessage = (event) => {
        try {
          const update: TrainingUpdate = JSON.parse(event.data);
          this.emit('update', update);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.handleReconnect();
    }
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      
      setTimeout(() => {
        this.connect();
      }, this.reconnectTimeout);

      // Exponential backoff
      this.reconnectTimeout *= 2;
    } else {
      console.error('Max reconnection attempts reached');
      this.emit('maxReconnectAttemptsReached');
    }
  }

  public subscribe(modelId: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'subscribe', modelId }));
    }
  }

  public unsubscribe(modelId: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'unsubscribe', modelId }));
    }
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

// Create a singleton instance
export const wsService = new WebSocketService();