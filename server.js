const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const {spawn} = require("child_process")
const cors = require("cors")
const path = require("path")
app.use(express.static("./client"));
app.use(express.static("./uploads"))

app.use(cors())
app.use('/uploads/dataset', express.static(path.join(__dirname, 'uploads/dataset')));

const uploadClientPath = "./uploads/client_image";
const uploadDatasetPath = "./uploads/dataset"
const fsExtra = require("fs-extra");
const emptyUpload = (req,res,next)=>{
  fsExtra.emptyDirSync(uploadDatasetPath)
  next()
}
const datasetStorage = multer.diskStorage({
  
  destination: (req,file,cb) => {
    
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
    }else{
      fsExtra.emptyDirSync("uploads/client_image")
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
let toggleValue
app.post("/api/submit",clientUpload.array("inputImg") ,(req, res) => {
   resultData = ""
  console.log(`req is ${req}`);
  console.log("hello world!");
  toggleValue = req.body["toggleStatus"]
  console.log(`toggle value: ${toggleValue}`);
  
  if(resultArray){
    res.status(200).json({ message: "succesfully"} );
  }res.end()
});
app.post("/api/dataset",emptyUpload,datasetUpload.array("inputDataset"),(req,res)=>{
  
  res.status(200).json({ message: "Files uploaded successfully!" });
  
  const pythonProcess = spawn("python3",["CBIR/CBIR.py",toggleValue])
  pythonProcess.stdout.on("data",(data)=>{
  resultData+= data.toString()
  pythonProcess.on("close",(code)=>{
    console.log(resultData)
    if(code ===0){
      resultArray = JSON.parse(resultData)
    }
  })

})
})

app.get("/api/result", (req,res)=>{
  res.status(200).json({resultArray})
  console.log(resultArray)
})

app.listen(5001, () => {
  console.log("Server is running on http://localhost:5001");
});

// 
