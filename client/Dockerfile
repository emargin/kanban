FROM node:17
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm build
RUN npm i -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
