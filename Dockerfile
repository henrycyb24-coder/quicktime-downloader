FROM node:18-bullseye

# Install python3, pip, ffmpeg
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg curl && \
    python3 -m pip install --upgrade pip && \
    python3 -m pip install yt-dlp

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 10000

CMD ["node", "server.js"]
