FROM node:alpine as build
WORKDIR "/usr/booking_app"

COPY package.json .
RUN npm install
COPY . .

CMD ["npm","start"]