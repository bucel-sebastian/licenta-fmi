import KafkaConfig from "./config.js";
import os from "os";

const kafkaConfig = new KafkaConfig();

// console.log(kafkaConfig.topics);
console.log("Consumatorul ruleaza pe portul 8090");

kafkaConfig.topics.forEach((topic) => {
  kafkaConfig.consume(topic, (value, topic, partition) => {
    console.log(
      "Mesajul primit: ",
      value,
      "-Partition: ",
      partition,
      "-Consumer: ",
      os.hostname()
    );

    if (topic === "email") {
    } else if (topic === "sms") {
    } else if (topic === "push") {
    }
  });
});
