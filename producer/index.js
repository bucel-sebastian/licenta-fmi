import express from "express";
import bodyParser from "body-parser";
import constrollers from "./controller.js";

const app = express();
const jsonParser = bodyParser.json();

app.post("/api/send", jsonParser, constrollers.sendMessageToKafka);

app.listen(8080, () => {
  console.log(`Producatorul Kafka ruleaza pe port-ul 8080!`);
});
