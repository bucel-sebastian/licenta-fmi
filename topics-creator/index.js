const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka-topics-init",
  brokers: ["kafka-service.kafka.svc.cluster.local:9092"],
});

async function waitForBrokers(numBrokers, timeout = 60000) {
  const admin = kafka.admin();
  await admin.connect();

  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const metadata = await admin.fetchTopicMetadata();
    if (metadata.brokers.length >= numBrokers) {
      await admin.disconnect();
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  await admin.disconnect();
  throw new Error(
    `Timed out waiting for ${numBrokers} brokers to become available`
  );
}

async function createTopics() {
  await waitForBrokers(3);

  const admin = kafka.admin();
  await admin.connect();

  const topics = [
    { topic: "email", numPartitions: 5, replicationFactor: 2 },
    { topic: "message", numPartitions: 5, replicationFactor: 2 },
    { topic: "push", numPartitions: 5, replicationFactor: 2 },
    { topic: "socialmedia", numPartitions: 5, replicationFactor: 2 },
    { topic: "calendar", numPartitions: 5, replicationFactor: 2 },
    { topic: "app", numPartitions: 5, replicationFactor: 2 },
    { topic: "news", numPartitions: 5, replicationFactor: 2 },
  ];

  await admin.createTopics({
    waitForLeaders: true,
    topics,
  });

  await admin.disconnect();
}

createTopics().catch(console.error);
