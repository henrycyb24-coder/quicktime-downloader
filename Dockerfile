FROM node:18-bookworm

# Install python3 and ffmpeg
RUN apt-get update && \
    apt-get install -y python3 python3-pip ffmpeg curl && \
    ln -s /usr/bin/python3 /usr/bin/python

# Install yt-dlp using pip (correct way)
RUN pip3 install --no-cache-dir yt-dlp

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything
COPY . .

# Expose port
EXPOSE 10000

# Start server
CMD ["node", "server.js"]
