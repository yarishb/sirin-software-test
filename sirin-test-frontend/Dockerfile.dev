FROM node:14.14.0-alpine
EXPOSE 3000
WORKDIR /app
COPY ./package.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "start"]
