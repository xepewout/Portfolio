const express = require('express');
const AWS = require('aws-sdk');
const app = express();
const port = 3001; // or any port you prefer

// AWS SDK configuration
AWS.config.update({
  region: 'your-region',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

// Endpoint to get the image count
app.get('/api/images/count', async (req, res) => {
  const params = {
    Bucket: 'your-bucket-name',
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    res.json({ count: data.KeyCount });
  } catch (err) {
    console.error("Error fetching image count:", err);
    res.status(500).send("Error fetching image count");
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
