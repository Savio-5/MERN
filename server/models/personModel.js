const mongoose = require('mongoose')
require('dotenv').config({
    path: './.env'
})

mongoose.set('strictQuery', false)

async function connect() {
    try{
        // mongodb://db:27017/mydatabase
        await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Savio:fl2SAv1byEEcHMQy@cluster-mern.gnljqnp.mongodb.net/?retryWrites=true&w=majority").then(result => {
            console.log('connected to MongoDB')
        })
    }catch(error){
        console.log(error)
    }
}

connect()

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        // minLength: 5,
        required: true
    },
    number: {
        type: String,
        length: 10,
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)