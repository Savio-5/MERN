FROM node:18.16.1

WORKDIR /app
COPY package*.json .

RUN npm ci

COPY . .

CMD [ "npm", "run", "dev" ]

EXPOSE 8000