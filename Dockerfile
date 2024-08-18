FROM node:18 AS build

RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/malshurman/greenhouse-server.git

WORKDIR /greenhouse-server

RUN npm install

EXPOSE 4000

CMD ["node", "server.js"]