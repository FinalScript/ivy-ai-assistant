import Redis from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';

export type ProcessingStatus = 'UPLOADING' | 'UPLOADED' | 'PROCESSING' | 'COMPLETED' | 'ERROR';

export interface ProcessingUpdate {
  fileId: string;
  status: ProcessingStatus;
  message: string;
  progress: number;
}

export const PROCESSING_STATUS_UPDATED = 'PROCESSING_STATUS_UPDATED';

// Create Redis Pub/Sub clients
const options = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  retryStrategy: (times: number) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};

// Create Redis Pub/Sub instance
export const redisPubSub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
});

export const updateProcessingStatus = async (update: ProcessingUpdate) => {
  await redisPubSub.publish(PROCESSING_STATUS_UPDATED, {
    processingStatusUpdated: update,
  });
}; 