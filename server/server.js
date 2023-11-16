const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");

app.get("/saveImage", (req, res) => {
  // Ambil URL data gambar dari parameter query
  const imageDataUrl = req.query.imageDataUrl;

  // Lakukan validasi dan konversi data URI ke buffer
  const matches = imageDataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return res.status(400).json({ error: "Invalid data URI" });
  }

  const imageType = matches[1];
  const imageData = matches[2];
  const buffer = Buffer.from(imageData, "base64");

  // Tentukan path dan nama file
  const filePath = path.join(__dirname, "client_image", "capturedImage.jpg");

  // Tulis buffer ke file
  fs.writeFileSync(filePath, buffer);

  return res.json({ success: true, message: "Image saved successfully" });
});

app.use(express.static("./client"));
const uploadClientPath = "./uploads/client_image";
const clientStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dapatkan nama subfolder dari timestamp saat ini
    // Cek apakah folder sudah ada atau belum, jika belum, buat folder baru
    if (!fs.existsSync(uploadClientPath)) {
      fs.mkdirSync(uploadClientPath, { recursive: true });
    }
    cb(null, uploadClientPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const clientUpload = multer({ storage: clientStorage });

app.post("/uploads/client_image", clientUpload.array("parcel"), (req, res) => {
  const toggleValue = req.body["toggle"];
  console.log(`toggle value: ${toggleValue}`);
  res.status(200).send({ status: "received" });
});

app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});
