const express = require('express')
const app = express();
//routes
app.get('/',(req, res)=>{
    res.status(200).send(`<h1>h1</h1>`)
})
app.listen(5000,()=>{
    console.log("Serverr is running on http://localhost:5000")
})