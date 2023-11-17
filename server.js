const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");

app.use(express.static("./client"));
const uploadClientPath = "./uploads/client_image";
const uploadDatasetPath = "./uploads/dataset"
const datasetStorage = multer.diskStorage({
  destination: (req,file,cb) => {
    if(!fs.existsSync(uploadDatasetPath)){
      fs.mkdirSync(uploadDatasetPath,{recursive: true})
    }
    cb(null, uploadDatasetPath)
  },filename: (req,file,cb)=>{
    cb(null,file.originalname)
  }
})
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
const datasetUpload = multer({storage : datasetStorage})
app.post("/api/submit",clientUpload.array("inputImg") ,(req, res) => {
  console.log(`req is ${req}`);
  console.log("hello world!");
  app.post("/api/dataset",datasetUpload.array("inputDataset"),(req,res)=>{
    res.status(200).json({ message: "Files uploaded successfully!" });
    
  })
  const toggleValue = req.body["toggleStatus"]
  console.log(`toggle value: ${toggleValue}`);
  


  res.status(200).json({ message: "Files uploaded successfully!" });
});


app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});


