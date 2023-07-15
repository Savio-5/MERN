FROM node:18.16.1

WORKDIR /app
COPY package*.json .

RUN npm ci
ENV MONGODB_URI="mongodb://mongo:27017/notes"

COPY . .

CMD [ "node", "index.js" ]

EXPOSE 5000