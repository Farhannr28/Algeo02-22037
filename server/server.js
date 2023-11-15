const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.use(express.static("./public"));
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
