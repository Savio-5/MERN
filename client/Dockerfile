FROM node:18.16.1

WORKDIR /app
COPY package*.json .

RUN npm ci

COPY . .

CMD [ "npm", "start" ]

EXPOSE 8000