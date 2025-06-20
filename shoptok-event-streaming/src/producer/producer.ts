import { Kafka } from 'kafkajs';

async function runProducer() {
  const kafka = new Kafka({
    clientId: 'shoptok-producer',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: 'user-events',
    messages: [
      { value: JSON.stringify({ eventType: 'test', payload: { message: 'hello world' } }) },
    ],
  });

  await producer.disconnect();
}

runProducer().catch(console.error);
