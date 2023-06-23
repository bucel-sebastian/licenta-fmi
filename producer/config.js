import { Kafka, logLevel, Partitioners } from "kafkajs";

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "kafka-broker",
      brokers: ["kafka-service.kafka.svc.cluster.local:9092"],
      retry: {
        initialRetryTime: 1000,
        retries: 10,
      },
    });

    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
    });
    this.admin = this.kafka.admin();
  }

  async connect() {
    await this.admin.connect();
    await this.producer.connect();
  }

  async disconnect() {
    await this.admin.disconnect();
    await this.producer.disconnect();
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

  async produce(topic, messages) {
    try {
      await this.producer.send({
        topic: topic,
        messages: messages,
      });

      console.log("SUCCESS - Mesajul a fost trimis!");
    } catch (error) {
      console.error("ERRROR - produce - ", error);
    }
  }
}

export default KafkaConfig;
