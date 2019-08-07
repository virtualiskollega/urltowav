FROM node:10-alpine
RUN apk add --no-cache ffmpeg
COPY . /app
WORKDIR /app
EXPOSE 3000
CMD ["node", "./app.js"]
