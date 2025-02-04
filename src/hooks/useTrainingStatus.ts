import { useState, useEffect } from 'react';
import { wsService, TrainingUpdate } from '../lib/websocket';

export function useTrainingStatus(modelId: string | null) {
  const [status, setStatus] = useState<TrainingUpdate | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleUpdate = (update: TrainingUpdate) => {
      setStatus(update);
    };

    const handleConnection = () => {
      setIsConnected(true);
      if (modelId) {
        wsService.subscribe(modelId);
      }
    };

    const handleDisconnection = () => {
      setIsConnected(false);
    };

    // Subscribe to WebSocket events
    wsService.on('update', handleUpdate);
    wsService.on('connected', handleConnection);
    wsService.on('disconnected', handleDisconnection);

    // Subscribe to model updates if we have a modelId
    if (modelId && isConnected) {
      wsService.subscribe(modelId);
    }

    // Cleanup
    return () => {
      if (modelId) {
        wsService.unsubscribe(modelId);
      }
      wsService.off('update', handleUpdate);
      wsService.off('connected', handleConnection);
      wsService.off('disconnected', handleDisconnection);
    };
  }, [modelId, isConnected]);

  return { status, isConnected };
}