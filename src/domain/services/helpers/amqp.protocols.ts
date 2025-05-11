import amqp from 'amqplib';

export interface AMQPHelperProtocols {
  connect: () => Promise<void>;
  sendToQueue: (queue: string, message: string) => Promise<void>;
  consume: (
    queue: string,
    callback: (msg: amqp.ConsumeMessage) => void
  ) => Promise<void>;
  close: () => Promise<void>;
}
