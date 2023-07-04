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
    console.log("Erori de conectare - ", counterErori);
  } catch (error) {
    counterErori++;
    console.error("Eroare la trimitearea mesajului: ", error.message);
  }
}

const jsonData = [
  {
    notificationType: "email",

    title: "Notificare de test - email",
    content: "Acesta este un notificare de tip email",
    timestamp: "",
    source: {
      type: "user",
      metadata: {
        userId: "user0001",
      },
    },
    recipient: {
      userId: "user0002",
    },
    metadata: {
      producer: "",
      consumer: "",
    },
  },
  {
    notificationType: "message",

    title: "Notificare de test - message",
    content: "Acesta este un notificare de tip message",
    timestamp: "",
    source: {
      type: "user",
      metadata: {
        userId: "user0001",
      },
    },
    recipient: {
      userId: "user0002",
    },
    metadata: {
      producer: "",
      consumer: "",
    },
  },
  {
    notificationType: "push",

    title: "Notificare de test - push",
    content: "Acesta este un notificare de tip push",
    timestamp: "",
    source: {
      type: "app",
      metadata: {
        appId: "app0001",
      },
    },
    recipient: {
      userId: "user0002",
    },
    metadata: {
      producer: "",
      consumer: "",
    },
  },
  {
    notificationType: "socialmedia",

    title: "Notificare de test - socialmedia",
    content: "Acesta este un notificare de tip socialmedia",
    timestamp: "",
    source: {
      type: "user",
      metadata: {
        userId: "user0001",
      },
    },
    recipient: {
      userId: "user0002",
    },
    metadata: {
      producer: "",
      consumer: "",
    },
  },
  {
    notificationType: "calendar",

    title: "Notificare de test - calendar",
    content: "Acesta este un notificare de tip calendar",
    timestamp: "",
    source: {
      type: "system",
    },
    recipient: {
      userId: "user0002",
    },
    metadata: {
      producer: "",
      consumer: "",
    },
  },
  {
    notificationType: "news",
    title: "Notificare de test - news",
    content: "Acesta este un notificare de tip news",
    timestamp: "",
    source: {
      type: "system",
    },
    recipient: {
      userId: "user0002",
    },
    metadata: {
      producer: "",
      consumer: "",
    },
  },
];

let producatori = [];
let counter = [];
let counterErori = 0;

for (let i = 0; i < 10000; i++) {
  let randomNumber = Math.floor(Math.random() * 6);
  setTimeout(() => {
    sendPostRequest(jsonData[randomNumber]);
  }, i * 15);
}
