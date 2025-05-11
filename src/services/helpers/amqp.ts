import amqp from 'amqplib';

export class AMQPHelper {
  #RABBITMQ_URL: string;
  #connection: amqp.ChannelModel | null = null;
  #channel: amqp.Channel | null = null;

  constructor() {
    if (!process?.env?.RABBITMQ_URL)
      throw new Error(
        'RABBITMQ_URL is not defined in the environment variables'
      );

    this.#RABBITMQ_URL = process.env.RABBITMQ_URL;
  }

  async connect(): Promise<void> {
    this.#connection = await amqp.connect(this.#RABBITMQ_URL);
    this.#channel = await this.#connection.createChannel();
  }

  async sendToQueue(queue: string, message: string): Promise<void> {
    if (!this.#channel) throw new Error('Channel is not initialized.');
    await this.#channel.assertQueue(queue, { durable: true });
    this.#channel.sendToQueue(queue, Buffer.from(message));
  }

  // Not is correct sendToQueue and consume in the same server
  // but is a good example to simulate a third party service
  async consume(
    queue: string,
    callback: (msg: amqp.ConsumeMessage) => void
  ): Promise<void> {
    if (!this.#channel) throw new Error('Channel is not initialized.');
    await this.#channel.assertQueue(queue, { durable: true });
    await this.#channel.consume(
      queue,
      (msg) => {
        if (msg) callback(msg);
      },
      { noAck: true }
    );
  }

  async close(): Promise<void> {
    await this.#channel?.close();
    await this.#connection?.close();
  }
}
