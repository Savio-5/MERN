FROM node:18.16.1

WORKDIR /app
COPY package*.json .

RUN npm ci
ENV MONGODB_URI="mongodb+srv://Savio:fl2SAv1byEEcHMQy@cluster-mern.gnljqnp.mongodb.net/?retryWrites=true&w=majority"

COPY . .

CMD [ "node", "index.js" ]

EXPOSE 5000