const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/CloudCanvas?readPreference=primary&directConnection=true&tls=false"

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
    console.log("Connected to mongodb");
}

module.exports=connectToMongo;