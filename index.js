const express = require('express');
const mongoose =require('mongoose')
const cors = require('cors');
const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

require('./controllers/authController')(app)
require('./controllers/produtoController')(app)




mongoose.connect('mongodb+srv://Gabriel:1234@cluster0.ew4jj.mongodb.net/Ecommerce?retryWrites=true&w=majority')
.then(()=>{
    console.log('Conectamos ao banco !')
    app.listen(3002)
})
.catch((err)=>{
    console.log('erroo')
    console.log(err)
})