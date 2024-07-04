const { kafka } = require("./config");

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  admin.connect();
  console.log("Adming Connection Success...");

  console.log("Creating Topic [rider-updates]");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic Created Success [rider-updates]");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

init();

/** Old Code */



// const { kafka } = require('./config');

// const admin = kafka.admin();

// (async () => {
//   // Connect to the Kafka broker
//   await admin.connect();
//   console.log('Admin Connected');

//   // Create a topic with 3 partitions
//   await admin.createTopics({
//     topics: [
//       {
//         topic: 'test-topic',
//         numPartitions: 2,
//         replicationFactor: 1,
//       },
//     ],
//   });

//   console.log('Topic Created');
//   await admin.disconnect();
// })().catch(console.error);
