import KafkaConfig from "./config.js";
import os from "os";

const consumeMessages = async () => {
  try {
    const kafkaConfig = await new KafkaConfig();
    const allTopics = await kafkaConfig.getTopics();

    const topics = allTopics.filter((topic) => !topic.startsWith("_"));

    console.log(`Consumatorul ${os.hostname()} ruleaza pe portul 8090`);
    console.log(topics);
    topics.forEach((topic) => {
      kafkaConfig.consume(topic, (value, topic, partition) => {
        const message = JSON.parse(value);
        message.metadata.consumer = os.hostname();
        message.metadata.topic = topic;
        message.metadata.partition = partition;

        if (topic === "email") {
          console.log(`INFO - Notificare noua - email - ${message.content}`);
          console.log(
            `INFO - Detalii notificare - email - `,
            JSON.stringify(message, null, 2)
          );
        } else if (topic === "message") {
          console.log(`INFO - Notificare noua - message - ${message.content}`);
          console.log(
            `INFO - Detalii notificare - message - `,
            JSON.stringify(message, null, 2)
          );
        } else if (topic === "push") {
          console.log(`INFO - Notificare noua - push - ${message.content}`);
          console.log(
            `INFO - Detalii notificare - push - `,
            JSON.stringify(message, null, 2)
          );
        } else if (topic === "socialmedia") {
          console.log(
            `INFO - Notificare noua - socialmedia - ${message.content}`
          );
          console.log(
            `INFO - Detalii notificare - socialmedia - `,
            JSON.stringify(message, null, 2)
          );
        } else if (topic === "calendar") {
          console.log(`INFO - Notificare noua - calendar - ${message.content}`);
          console.log(
            `INFO - Detalii notificare - calendar - `,
            JSON.stringify(message, null, 2)
          );
        } else if (topic === "app") {
          console.log(`INFO - Notificare noua - app - ${message.content}`);
          console.log(
            `INFO - Detalii notificare - app - `,
            JSON.stringify(message, null, 2)
          );
        } else if (topic === "news") {
          console.log(`INFO - Notificare noua - news - ${message.content}`);
          console.log(
            `INFO - Detalii notificare - news - `,
            JSON.stringify(message, null, 2)
          );
        }
      });
    });
  } catch (error) {
    console.log("ERROR - consumeMessages - ", error);
    console.log(
      `INFO - Consumatorul ${os.hostname()} isi va termina rularea in 5 secunde`
    );
    setTimeout(() => {
      process.exit(1);
    }, 5000);
  }
};
0;

consumeMessages();
