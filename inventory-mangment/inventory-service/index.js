const kafka = require('kafka-node');

const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new Consumer(
  client,
  [{ topic: 'order-topic', partition: 0 }],
  { autoCommit: true }
);

consumer.on('message', (message) => {
  const order = JSON.parse(message.value);
  console.log('Order received:', order);

  console.log(`Updating inventory for product ${order.productId} with quantity ${order.quantity}`);
});

consumer.on('error', (error) => {
  console.error('Consumer error:', error);
});
