#!/bin/sh
# Wait for RabbitMQ
until nc -z rabbitmq 5672; do
  echo "Waiting for RabbitMQ..."
  sleep 2
done

# Wait for Postgres
until nc -z database 5432; do
  echo "Waiting for Postgres..."
  sleep 2
done

exec "$@"