const customerModel = require('../models/customer')
const express = require('express')
const router = express.Router()

// CREATE a new customer
router.post('/customer', (req, res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }

    const model = new customerModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                res.status(500).send(doc)
            }
            res.status(201).json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })

})

// READ customer details
// Using queryString (req.query) as it is recommended to using request body (req.body)
router.get('/customer', (req, res) => {
    if(!req.query.email){
        return res.status(400).send('Missing URL param: email')
    }
    customerModel.findOne({
        email: req.query.email
    })
    .then(doc =>{
        res.status(200).json(doc)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})

// UPDATE customer details
router.put('/customer', (req, res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }

    if(!req.query.email){
        return res.status(400).send('Missing URL param: email')
    }
    customerModel.findOneAndUpdate({
        email: req.query.email
    }, req.body, {
        new: true // return the updated object
    })
    .then(doc =>{
        res.status(200).json(doc)
    })
    .catch(err =>{
        res.status(500).json(err)
    })

})

// DELETE a customer
router.delete('/customer', (req, res) => {
    if(!req.query.email){
        return res.status(400).send('Missing URL param: email')
    }
    customerModel.findOneAndRemove({
        email: req.query.email
    })
    .then(doc =>{
        res.status(200).json(doc)
    })
    .catch(err =>{
        res.status(500).json(err)
    })

})


module.exports = router