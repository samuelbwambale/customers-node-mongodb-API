const customerModel = require('../models/customer')
const express = require('express')
const router = express.Router()


/*  req.params, req.query and req.body 

        req.query comes from query parameters in the URL such as http://foo.com/somePath?name=ted 
        where req.query.name === "ted".

        req.params comes from path segments of the URL that match a parameter in the route definition 
        such as /song/:songid. So, with a route using that designation and a URL such as /song/48586, 
        then req.params.songid === "48586".

        req.body properties come from a form post where the form data (which is submitted in the body contents) 
        has been parsed into properties of the body tag.
*/

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