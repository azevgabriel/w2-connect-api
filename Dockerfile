FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8080

CMD ["npm", "run", "dev"]