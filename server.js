const express = require('express')
const app = express();
const multer = require('multer')
app.use(express.static('public'))
const upload = multer({ dest: 'uploads/'})
//routes
// app.get('/',(req, res)=>{
//     const {key} = req.query
//     console.log(key)
//     res.status(200).json({info: 'preset text'})
// })

app.post('/', upload.single('parcel'),(req,res)=>{

    res.status(200).send({status: 'received'})
})
app.listen(5001,()=>{
    console.log("Server is running on http://localhost:5001")
})