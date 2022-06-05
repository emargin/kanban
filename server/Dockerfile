FROM node:17
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm build
EXPOSE 8000
CMD ["node", "./build/bin/www.js"] 
