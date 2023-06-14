import express from "express";
import bodyParser from "body-parser";
import constrollers from "./controller.js";
import KafkaConfig from "./config.js";
import os from "os";

const app = express();
const jsonParser = bodyParser.json();

app.post("/api/send", jsonParser, constrollers.sendMessageToKafka);

const getClusterDetails = async () => {
  const kafkaConfig = await new KafkaConfig();

  await kafkaConfig.connect();
  const describeCluster = await kafkaConfig.getDescribeCluster();
  await kafkaConfig.disconnect();

  console.log("Detaliile clusterului Kafka - ", describeCluster);
};

app.listen(5000, () => {
  console.log(`Producatorul Kafka (${os.hostname()})  ruleaza!`);
  getClusterDetails();
});
