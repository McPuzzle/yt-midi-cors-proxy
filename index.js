const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const upload = multer();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.post("/yt-to-midi", upload.single("file"), async (req, res) => {
  try {
    const form = new FormData();

    if (req.body.youtubeUrl) {
      form.append("youtubeUrl", req.body.youtubeUrl);
    }

    if (req.file) {
      form.append("file", req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype,
      });
    }

const response = await axios.post(
  "https://mcpuzzle.app.n8n.cloud/webhook/yt-to-midi", // ✅ PRODUCTION URL
  form,
  {
    headers: form.getHeaders(),
    responseType: "arraybuffer",
  }
);

    );

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", "attachment; filename=midi-files.zip");
    res.send(response.data);
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: "Proxy failed", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
