// example file: index.js
const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer();

app.post('/convert', upload.single('file'), async (req, res) => {
  try {
    // Your actual conversion logic here, e.g., parse the uploaded file
    const midiFileBuffer = req.file.buffer; // binary data

    // Example: Respond with dummy zip to simulate
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=converted.zip');
    res.send(midiFileBuffer); // Replace with actual .zip file buffer!
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`YT-MIDI server running on port ${PORT}`));
