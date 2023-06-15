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
        } else if (topic === "sms") {
          console.log(`INFO - Notificare noua - sms - ${message.content}`);
          console.log(`INFO - Detalii notificare - sms - `, message.toString());
        } else if (topic === "push") {
          console.log(`INFO - Notificare noua - push - ${message.content}`);
          console.log(
            `INFO - Detalii notificare - push - `,
            message.toString()
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
