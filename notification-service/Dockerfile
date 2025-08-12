FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production && npm cache clean --force

EXPOSE 3004

CMD ["npm", "run", "start:prod"]