import { Kafka } from "kafkajs";

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "kafka-broker",
      brokers: ["localhost:9092"],
      connectionTimeout: 10000,
    });
    this.consumer = this.kafka.consumer({ groupId: "kafka-consumer-group" });
    this.admin = this.kafka.admin();
    // this.topics = this.getTopics();
  }

  async getTopics() {
    try {
      await this.admin.connect();

      const topics = await this.admin.listTopics();
      return await topics;
    } catch (error) {
      console.error(error);
    } finally {
      await this.admin.disconnect();
    }
  }

  async consume(topic, callback) {
    try {
      await this.consumer.connect();
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
