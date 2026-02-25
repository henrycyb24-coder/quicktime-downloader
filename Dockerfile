FROM node:18-bullseye

# Install ffmpeg + yt-dlp correctly
RUN apt-get update && \
    apt-get install -y ffmpeg curl && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp \
    -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install node dependencies
RUN npm install

# Copy everything
COPY . .

# Expose port
EXPOSE 10000

# Start server
CMD ["node", "server.js"]
