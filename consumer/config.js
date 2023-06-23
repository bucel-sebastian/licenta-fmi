import { Kafka } from "kafkajs";

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "kafka-broker",
      brokers: ["kafka-service.kafka.svc.cluster.local:9092"],
      connectionTimeout: 10000,
      retry: {
        initialRetryTime: 1000,
        retries: 10,
      },
    });
    this.consumer = this.kafka.consumer({
      groupId: "kafka-consumer-group",
    });
    this.admin = this.kafka.admin();
  }

  async connect() {
    await this.admin.connect();
    await this.consumer.connect();
  }

  async disconnect() {
    await this.admin.disconnect();
    await this.consumer.disconnect();
  }

  async getDescribeCluster() {
    try {
      const describeCluster = await this.admin.describeCluster();
      return describeCluster;
    } catch (error) {
      console.error("ERRROR - describeCluster - ", error);
    }
  }

  async getTopics() {
    try {
      const topics = await this.admin.listTopics();
      return topics;
    } catch (error) {
      console.error("ERRROR - listTopics - ", error);
    }
  }

  async consume(topic, callback) {
    try {
      await this.consumer.subscribe({ topic: topic, fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value.toString();
          callback(value, topic, partition);
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default KafkaConfig;
