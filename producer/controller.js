import KafkaConfig from "./config.js";

const sendMessageToKafka = async (req, res) => {
  try {
    const { message } = req.body;
    const kafkaConfig = new KafkaConfig();

    if (kafkaConfig.topics.includes(message.notificationType)) {
      message.timestamp = new Date().getTime();

      const messages = [{ value: message }];
      kafkaConfig.produce(message.notificationType, messages);

      res.status(200).json({
        status: "Ok!",
        message: "Notificarea a fost trimisa cu succes!",
      });
    } else {
      res.status(400).json({
        status: "Eroare!",
        message: "Tipul notificari nu este unul suportat!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const constrollers = { sendMessageToKafka };

export default constrollers;
