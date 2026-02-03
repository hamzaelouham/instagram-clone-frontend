import { EventEmitter } from 'events';

const globalEmitter = (global as any).notificationEmitter;
const emitter = globalEmitter || new EventEmitter();
if (!globalEmitter) {
  (global as any).notificationEmitter = emitter;
  console.log('[PUBSUB] Global EventEmitter created');
}

export const pubsub = {
  publish: (event: string, payload: any) => {
    emitter.emit(event, payload);
  },
  asyncIterator: (event: string) => {
    const { Readable } = require('stream');
    const readable = new Readable({
      objectMode: true,
      read() {},
    });
    const handler = (payload: any) => {
      readable.push(payload);
    };
    emitter.on(event, handler);
    const originalReturn = readable[Symbol.asyncIterator].bind(readable);
    return {
      next() {
        return readable[Symbol.asyncIterator]().next();
      },
      return() {
        emitter.off(event, handler);
        readable.push(null);
        return Promise.resolve({ value: undefined, done: true });
      },
      throw(err: any) {
        emitter.off(event, handler);
        readable.destroy(err);
        return Promise.reject(err);
      },
      [Symbol.asyncIterator]() {
        return this;
      },
    };
  },
  instanceId: 'event-emitter',
};

export const EVENTS = {
  NOTIFICATION_CREATED: 'NOTIFICATION_CREATED',
};
