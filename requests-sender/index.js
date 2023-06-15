const axios = require("axios");

async function sendPostRequest(data) {
  try {
    const response = await axios.post("http://localhost/api/send", data);
    console.log("Server response: ", response.data);

    if (producatori.includes(response.data.details.metadata.producer)) {
      counter[response.data.details.metadata.producer] =
        counter[response.data.details.metadata.producer] + 1;
    } else {
      producatori.push(response.data.details.metadata.producer);
      counter[response.data.details.metadata.producer] = 1;
    }
    console.log(counter);
  } catch (error) {
    console.error("Eroare la trimitearea mesajului: ", error.message);
  }
}

const jsonData = [
  {
    notificationType: "sms",
    title: "Test 1",
    content: "Test mesaj catre topic Kafka 1",
    timestamp: "",
    sender: {
      userId: "001",
      username: "z0rg3d",
    },
    recipient: {
      userId: "002",
      username: "z0rg2d",
    },
    metadata: {
      source: "system",
      priority: "high",
      producer: "",
      consumer: "",
    },
  },
  {
    notificationType: "email",
    title: "Test 2",
    content: "Test mesaj catre topic Kafka 2",
    timestamp: "",
    sender: {
      userId: "001",
      username: "z0rg3d",
    },
    recipient: {
      userId: "002",
      username: "z0rg2d",
    },
    metadata: {
      source: "system",
      priority: "high",
      producer: "",
      consumer: "",
    },
  },
  {
    notificationType: "push",
    title: "Test 3",
    content: "Test mesaj catre topic Kafka 3",
    timestamp: "",
    sender: {
      userId: "001",
      username: "z0rg3d",
    },
    recipient: {
      userId: "002",
      username: "z0rg2d",
    },
    metadata: {
      source: "system",
      priority: "high",
      producer: "",
      consumer: "",
    },
  },
];

let producatori = [];
let counter = [];

for (let i = 0; i < 100; i++) {
  let randomNumber = Math.floor(Math.random() * 3);
  sendPostRequest(jsonData[randomNumber]);
}
