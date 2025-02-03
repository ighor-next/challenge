#!/bin/sh
set -e

until nc -z -v -w30 mysql 3306
do
  echo "Aguardando MySQL..."
  sleep 5
done

echo "MySQL está pronto. Iniciando aplicação..."
exec "$@"
