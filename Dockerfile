FROM node:16

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3000

CMD ["npm", "run", "start:dev"]