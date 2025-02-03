FROM node:16

RUN apt-get update && apt-get install -y netcat

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

RUN npm install

COPY . .

COPY wait-for-it.sh .

RUN chmod +x wait-for-it.sh

RUN npx prisma generate


COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]

EXPOSE 3001