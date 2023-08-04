FROM node:18.16.1

WORKDIR /app
COPY package*.json .

RUN npm ci
ENV MONGODB_URI="mongodb://db:27017/mydatabase"

COPY . .

CMD [ "node", "index.js" ]

EXPOSE 5000