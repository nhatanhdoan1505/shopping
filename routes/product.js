const express = require('express');
const router = express.Router();
const Categories = require("../model/category")


// Product Page
router.get('/', (req, res) => {
    Categories.find({}, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            res.render('product', {
                category: cate
            })
        }
    })
})

// TCDB Page
router.get('/tcdb', (req, res) => {
    Categories.find({Type : 'tcdb'}, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            res.render('product', {
                category: cate
            })
        }
    })
})

// CCDB Page
router.get('/ccdb', (req, res) => {
    Categories.find({Type : 'ccdb'}, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            res.render('product', {
                category: cate
            })
        }
    })
})

// CCMN Page
router.get('/ccmn', (req, res) => {
    Categories.find({Type : 'ccmn'}, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            res.render('product', {
                category: cate
            })
        }
    })
})

// PKTT Page
router.get('/pktt', (req, res) => {
    Categories.find({Type : 'pktt'}, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            res.render('product', {
                category: cate
            })
        }
    })
})

module.exports = router;
