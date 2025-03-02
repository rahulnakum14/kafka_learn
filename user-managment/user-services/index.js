const express = require('express')
const kafka = require('kafka-node');

const app = express();
app.use(express.json());

const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

const admin = new kafka.Admin(client);
admin.createTopics([{ topic: 'user-topic', partitions: 1, replicationFactor: 1 }], (error, result) => {
    if (error) {
        console.error('Error creating topic:', error);
    } else {
        console.log('Topic created or already exists:', result);
    }
});

producer.on('ready', () => {
    console.log('Kafka Producer is connected and ready.');
});

producer.on('error', (error) => {
    console.error('Producer error:', error);
});

app.post('/user', (req, res) => {
    const order = req.body;

    const payloads = [
        {
            topic: 'user-topic',
            messages: JSON.stringify(order),
            partition: 0,
        },
    ];

    producer.send(payloads, (error, data) => {
        if (error) {
            console.error('Error sending message:', error);
            res.status(500).send('Error creating user');
        } else {
            console.log('User created:', data);
            res.status(200).send('User created successfully');
        }
    });
});


app.listen(3000, () => {
    console.log('Order service is running on port 3000');
});
