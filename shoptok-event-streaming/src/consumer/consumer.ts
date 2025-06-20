import { Kafka } from 'kafkajs';

async function runConsumer() {
  const kafka = new Kafka({
    clientId: 'shoptok-consumer',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  });

  const consumer = kafka.consumer({ groupId: 'shoptok-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'user-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = message.value.toString();
      console.log(`Received event: ${event}`);
      // TODO: Process event, save to DB, update ML features, etc.
    },
  });
}

runConsumer().catch(console.error);
