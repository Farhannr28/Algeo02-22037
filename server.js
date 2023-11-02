const express = require('express')
const app = express();
app.use(express.static('public'))
//routes
// app.get('/',(req, res)=>{
//     const {key} = req.query
//     console.log(key)
//     res.status(200).json({info: 'preset text'})
// })

app.post('/', (req,res)=>{
    res.status(200).send({status: 'received'})
})
app.listen(5001,()=>{
    console.log("Server is running on http://localhost:5001")
})