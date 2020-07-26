const express = require('express');
const router = express.Router();
const Cart = require('../model/cart')
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');
const {
    authenticate
} = require('passport');
const Categories = require("../model/product")

// Home Page
router.get('/', forwardAuthenticated, (req, res) => {
    Categories.find({
            Type: 'tcdb'
        })
        .then(tcdb => {
            cTcdb = tcdb.length
            Categories.find({
                    Type: 'ccdb'
                })
                .then(ccdb => {
                    cCcdb = ccdb.length
                    Categories.find({
                            Type: 'ccmn'
                        })
                        .then(ccmn => {
                            cCcmn = ccmn.length
                            Categories.find({
                                    Type: 'pktt'
                                })
                                .then(pktt => {
                                    cPktt = pktt.length
                                    Categories.find({}, )
                                        .then(cate => {
                                            res.render('home', {
                                                tcdb: cTcdb,
                                                ccdb: cCcdb,
                                                ccmn: cCcmn,
                                                pktt: cPktt,
                                                category: cate.slice(0, 4)
                                            })
                                        })
                                })
                        })
                })
        })
})


router.get('/home', forwardAuthenticated, (req, res) => {
    Categories.find({
            Type: 'tcdb'
        })
        .then(tcdb => {
            cTcdb = tcdb.length
            Categories.find({
                    Type: 'ccdb'
                })
                .then(ccdb => {
                    cCcdb = ccdb.length
                    Categories.find({
                            Type: 'ccmn'
                        })
                        .then(ccmn => {
                            cCcmn = ccmn.length
                            Categories.find({
                                    Type: 'pktt'
                                })
                                .then(pktt => {
                                    cPktt = pktt.length
                                    Categories.find({}, )
                                        .then(cate => {
                                            res.render('home', {
                                                tcdb: cTcdb,
                                                ccdb: cCcdb,
                                                ccmn: cCcmn,
                                                pktt: cPktt,
                                                category: cate.slice(0, 4)
                                            })
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


router.get('/add/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Categories.find({Id: productId})
        .then(cate => {
            cart.add(cate, cate.Id);
            req.session.cart = cart;    
            res.redirect('/');
        })
});

module.exports = router;