const amqp = require('amqplib');

async function checkRabbitMQConnection() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    console.log('RabbitMQ connection successful');
    await connection.close();
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error.message);
  }
}

checkRabbitMQConnection();
