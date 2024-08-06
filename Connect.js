const mongoose = require('mongoose')

const URL = 'mongodb+srv://sgahana1505:gahana@cluster0.ovgf9iv.mongodb.net/posapp'
mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected' , ()=>{
    console.log('Mongo DB Connection Successfull')
})

connectionObj.on('error' , ()=>{
    console.log('Mongo DB Connection Failed')
})