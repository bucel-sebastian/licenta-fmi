import KafkaConfig from "./config.js";
import os from "os";

const sendMessageToKafka = async (req, res) => {
  try {
    const message = req.body;
    console.log(message);
    const kafkaConfig = await new KafkaConfig();
    await console.log("lista de topicuri ", kafkaConfig.topics);

    if (kafkaConfig.topics.includes(message.notificationType)) {
      message.timestamp = new Date().getTime();
      message.metadata.producer = os.hostname();

      const topic = message.notificationType;
      const messages = [{ value: message }];
      kafkaConfig.produce(topic, messages);

      res.status(200).json({
        status: "Ok!",
        message: `Notificarea a fost trimisa cu succes! \n ${message}`,
      });
    } else {
      res.status(400).json({
        status: "Eroare!",
        message: `Tipul notificari nu este unul suportat! - ${message.notificationType}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const constrollers = { sendMessageToKafka };

export default constrollers;
