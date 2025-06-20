import { connectProducer } from './common/kafka.producer';

async function bootstrap() {
  // Your existing bootstrap code here (e.g. create app, listen, etc.)
  await connectProducer();
  // Continue startup logic here
}

bootstrap();
