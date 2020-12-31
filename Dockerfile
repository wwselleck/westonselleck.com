FROM node:latest

WORKDIR /usr/app

COPY . .
RUN npm install
RUN npm run build
RUN ls

CMD ["npm", "start"]
