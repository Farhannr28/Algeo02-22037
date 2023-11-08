const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');

app.use(express.static('./public'));
app.use('/uploads/client_image', express.static('uploads/client_image'))
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dapatkan nama subfolder dari timestamp saat ini
    const uploadPath = "./uploads/client_image";
    // Cek apakah folder sudah ada atau belum, jika belum, buat folder baru
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post('/', upload.array('parcel'), (req, res) => {
  res.status(200).send({ status: 'received' });
});

app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
