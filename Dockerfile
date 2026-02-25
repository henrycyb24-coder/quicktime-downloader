FROM node:18-bullseye

# Install Python 3.11 + ffmpeg + curl
RUN apt-get update && \
    apt-get install -y python3.11 python3.11-distutils ffmpeg curl && \
    ln -sf /usr/bin/python3.11 /usr/bin/python3 && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 10000

CMD ["node", "server.js"]
