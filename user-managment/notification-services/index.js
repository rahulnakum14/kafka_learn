const kafka = require('kafka-node');

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost:'localhost:9092'});

const consumer = new Consumer(
    client,
    [{ topic: 'user-topic', partition: 0 }],
    { autoCommit: true }
  );

  consumer.on('message', (message) => {
    const order = JSON.parse(message.value);
    console.log('notification received:', order);
  });
  
  consumer.on('error', (error) => {
    console.error('Consumer error:', error);
  });
  