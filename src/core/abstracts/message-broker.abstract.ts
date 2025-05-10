export abstract class MessageBroker {
  abstract produce(record: { topic: string; messages: any[] }): Promise<void>;
  abstract consume(topics: any, config: any): Promise<any>;
}
