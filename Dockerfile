FROM node:10-alpine
RUN apk add --no-cache ffmpeg
COPY . /app
WORKDIR /app
EXPOSE 3000
ENTRYPOINT ["node", "./app.js"]
