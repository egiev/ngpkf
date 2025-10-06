export type KafkaAdminServiceType = {
  connect(): Promise<void>;

  disconnect(): Promise<void>;

  getAllTopic(): Promise<string[]>;

  createTopics(): Promise<void>;
};
