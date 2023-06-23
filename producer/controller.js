import KafkaConfig from "./config.js";
import os from "os";

const sendMessageToKafka = async (req, res) => {
  try {
    const message = req.body;

    const kafkaConfig = await new KafkaConfig();
    await kafkaConfig.connect();

    const topics = await kafkaConfig.getTopics();

    if (topics.includes(message.notificationType)) {
      message.timestamp = new Date().toLocaleString();
      message.metadata.producer = os.hostname();

      const topic = message.notificationType;
      const messages = [{ value: JSON.stringify(message) }];
      await kafkaConfig.produce(topic, messages);

      res.status(200).json({
        status: "Ok!",
        message: `Notificarea a fost trimisa cu succes! catre topicul ${topic}`,
        details: message,
      });
    } else {
      res.status(400).json({
        status: "Eroare!",
        message: `Tipul notificari nu este unul suportat! - ${message.notificationType}`,
      });
    }

    await kafkaConfig.disconnect();
  } catch (error) {
    console.log("ERROR - sendMessageToKafka - ", error);
  }
};

const constrollers = { sendMessageToKafka };

export default constrollers;
