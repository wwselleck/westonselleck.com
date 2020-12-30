FROM node:latest

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY src ./src
RUN npm install
RUN npm run build

CMD ["npm", "start"]
