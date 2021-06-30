FROM node:14.14.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm i
RUN npm i -D
RUN npm install -g ts-node
RUN npm install typescript
COPY . .
CMD ["npm", "run", "dev"]
EXPOSE 5000

