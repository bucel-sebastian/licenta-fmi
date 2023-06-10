import { Kafka } from "kafkajs";

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "kafka-broker",
      brokers: ["kafka-service:9092"],
    });
    this.producer = this.kafka.producer();
    this.admin = this.kafka.admin();
    this.topics = this.getTopics();
  }

  async getTopics() {
    try {
      await this.admin.connect();

      const topics = await this.admin.listTopics();
      return topics;
    } catch (error) {
      console.error(error);
    } finally {
      await this.admin.disconnect();
    }
  }

  async produce(topic, messages) {
    try {
      await this.producer.connect();

      await messages.forEach(async (message) => {
        await this.producer.send({
          topic: message.notificationType,
          messages: message,
        });
      });
    } catch (error) {
      console.error(error);
    } finally {
      await this.producer.disconnect();
    }
  }
}

export default KafkaConfig;
