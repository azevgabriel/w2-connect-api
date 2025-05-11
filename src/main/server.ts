import 'module-alias/register';

import { ReservationsPrismaRepository } from '@/infra/prisma/reservations/reservations-prisma-repository';
import { AMQPHelper } from '@/services/helpers/amqp';
import { appConfig } from './config/app';

const amqp = new AMQPHelper();

const app = appConfig();
const PORT = process?.env?.PORT || 8080;

async function startServer() {
  try {
    await amqp.connect();
    console.log('RabbitMQ conectado');

    await amqp.consume('reservation', (msg) => {
      console.log('Simulando o processamento de uma reserva...');

      const reservationPrismaRepository = new ReservationsPrismaRepository();
      reservationPrismaRepository.updateById(msg.content.toString(), {
        status: 'confirmed',
      });

      console.log('Reserva confirmada');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao iniciar aplicação:', err);
    process.exit(1);
  }
}

startServer();
