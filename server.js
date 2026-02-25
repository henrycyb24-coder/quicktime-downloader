const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// VERY IMPORTANT FOR RENDER
const PORT = process.env.PORT || 3000;

/*
====================================
ROOT
====================================
*/
app.get('/', (req, res) => {
  res.json({ message: "QuickTime Downloader API Running 🚀" });
});

/*
====================================
1️⃣ GET VIDEO INFO (GET METHOD)
====================================
*/
app.get('/info', (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "Video URL required" });
  }

  const command = `yt-dlp -j "${url}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(stderr);
      return res.status(500).json({ error: "Failed to fetch video info" });
    }

    try {
      const data = JSON.parse(stdout);

      res.json({
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        duration: data.duration,
        uploader: data.uploader
      });

    } catch (err) {
      res.status(500).json({ error: "Error parsing video info" });
    }
  });
});

/*
====================================
2️⃣ DOWNLOAD VIDEO (GET METHOD)
====================================
*/
app.get('/download', (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "Video URL required" });
  }

  const fileName = `video_${Date.now()}.mp4`;
  const outputPath = path.join(__dirname, fileName);

  const command = `yt-dlp -f best -o "${outputPath}" "${url}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(stderr);
      return res.status(500).json({ error: "Download failed" });
    }

    res.download(outputPath, fileName, (err) => {
      if (err) {
        console.log(err);
      }

      fs.unlink(outputPath, () => {});
    });
  });
});

/*
====================================
START SERVER
====================================
*/
const PORT = process.env.PORT || 10000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
