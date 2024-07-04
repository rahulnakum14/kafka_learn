const { kafka } = require('./config');
const group = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();

  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${group}: [${topic}]: PART:${partition}:`,
        message.value.toString()
      );
    },
  });
}

init();


/** Old Code */


// const { kafka } = require('./config');

// const consumer = kafka.consumer({ groupId: 'test-group' });

// (async () => {
//   await consumer.connect();
//   console.log('Consumer Connected');

//   await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log({
//         value: message.value.toString(),
//       });
//       console.log(`topic -- ${topic} -- partition ${partition} -- group test-group`);
//     },
//   });
// })();
