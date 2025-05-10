export abstract class MessageBroker {
  abstract produce(params: any): Promise<void>;
  abstract consume(topics: any, config: any): Promise<any>;
}
