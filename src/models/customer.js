const mongoose = require('mongoose')

const database = 'customers-node-mongodb-API'
const user = 'sbwambale'
const password = '1234'

mongoose.connect(`mongodb+srv://${user}:${password}@testcluster1-acc9d.mongodb.net/${database}?retryWrites=true&w=majority`, { useNewUrlParser: true })

const customerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer