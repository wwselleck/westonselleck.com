FROM node:latest

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
RUN npm run build
RUN npm install

CMD ["npm", "start"]
