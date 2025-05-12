#!/bin/sh

echo "Aguardando RabbitMQ estar disponível..."

until nc -z rabbitmq 5672; do
  sleep 1
done

echo "RabbitMQ está pronto. Iniciando aplicação..."
exec "$@"dockerfile