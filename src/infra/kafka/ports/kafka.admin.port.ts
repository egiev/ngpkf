export abstract class KafkaAdminPort {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract getAllTopic(): Promise<string[]>;
  abstract createTopics(): Promise<void>;
}
