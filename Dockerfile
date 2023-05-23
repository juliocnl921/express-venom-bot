FROM node:current-alpine3.17
RUN apk add --no-cache  chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm update
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "main.js" ]