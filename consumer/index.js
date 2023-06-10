import KafkaConfig from "./config.js";

const kafkaConfig = new KafkaConfig();

// console.log(kafkaConfig.topics);
console.log("Consumatorul ruleaza pe portul 8090");

kafkaConfig.consume("email", (value, topic, partition) => {
  console.log(
    "Mesajul primit: ",
    value,
    "-Partition: ",
    partition,
    "-Topic: ",
    topic
  );
});
