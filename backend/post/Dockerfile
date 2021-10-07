FROM node:14
WORKDIR /app/post
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8022
CMD [ "node", "server.js" ]
