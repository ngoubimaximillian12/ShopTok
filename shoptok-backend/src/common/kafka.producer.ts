import { Kafka, Producer } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'shoptok-backend',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer: Producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
}

export async function sendEventToKafka(event: any) {
  await producer.send({
    topic: process.env.KAFKA_TOPIC || 'events',
    messages: [{ value: JSON.stringify(event) }],
  });
}
