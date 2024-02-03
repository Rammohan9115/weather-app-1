FROM node:latest
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

CMD ["npm", "start"]
