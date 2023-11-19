const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const {spawn} = require("child_process")
const cors = require("cors")
const path = require("path")
app.use(express.static("./client"));
app.use(express.static("./uploads"))
app.use(express.static("/uploads/dataset"))
app.use(cors())
const uploadClientPath = "./uploads/client_image";
const uploadDatasetPath = "./uploads/dataset"
const fsExtra = require("fs-extra");

const emptyDirectory = (directoryPath) => {
  fsExtra.emptyDirSync(directoryPath);
};

const datasetStorage = multer.diskStorage({
  
  destination: (req,file,cb) => {
    
  emptyDirectory(uploadDatasetPath)
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
    emptyDirectory(uploadClientPath)
  
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

let resultData = ""
let resultArray 
const clientUpload = multer({ storage: clientStorage });
const datasetUpload = multer({storage : datasetStorage})

app.post("/api/submit",clientUpload.array("inputImg") ,(req, res) => {
   resultData = ""
  console.log(`req is ${req}`);
  console.log("hello world!");
  app.post("/api/dataset",datasetUpload.array("inputDataset"),(req,res)=>{
    res.status(200).json({ message: "Files uploaded successfully!" });
    
  })
  const toggleValue = req.body["toggleStatus"]
  console.log(`toggle value: ${toggleValue}`);
  
  const pythonProcess = spawn("python3",["CBIR/CBIR.py",toggleValue])
  pythonProcess.stdout.on("data",(data)=>{
    resultData+= data.toString()
  })
  pythonProcess.on("close",(code)=>{
    console.log(resultData)
    if(code ===0){
      resultArray = JSON.parse(resultData)
    }
  })
  if(resultArray){
    res.status(200).json({ message: "succesfully"} );
  }res.end()
});
app.get("/api/result", (req,res)=>{
  res.status(200).json({resultArray})
  
  console.log(resultArray)
})

app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});

// 
