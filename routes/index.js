const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');
const {
    authenticate
} = require('passport');
const Categories = require("../model/category")

// Home Page
router.get('/', forwardAuthenticated, (req, res) => {
    Categories.find({Type : 'tcdb'})
    .then(tcdb => {
        cTcdb = tcdb.length
        Categories.find({Type : 'ccdb'})
        .then(ccdb => {
            cCcdb = ccdb.length
            Categories.find({Type : 'ccmn'})
            .then(ccmn => {
                cCcmn = ccmn.length
                Categories.find({Type : 'pktt'})
                .then(pktt => {
                    cPktt = pktt.length
                    res.render('home', {
                        tcdb : cTcdb,
                        ccdb : cCcdb,
                        ccmn : cCcmn,
                        pktt : cPktt
                    })
                })
            })
        })
    })
})

// About Page
router.get('/about', (req, res) => {
    res.render('about')
})

// Contact Page
router.get('/contact', (req, res) => {
    res.render('contact')
})

// Admin Manage Page
router.get('/manage', ensureAuthenticated, (req, res) => {
    Categories.find({}, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            res.render('admin', {
                category: cate
            })
        }
    })
})

module.exports = router;