const express = require('express');
const router = express.Router();
const Cart = require('../model/cart')
const Order = require('../model/order')
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


router.get('/add/:id', (req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    Categories.find({
            Id: productId
        })
        .then(cate => {
            cart.add(cate[0], cate[0].Id);
            req.session.cart = cart;
            res.redirect('/product');
            console.log(req.session.cart.items)
        })
});

router.get('/cart', (req, res) => {
    if (!req.session.cart) {
        return res.render('cart', {
            products: null
        });
    }
    let cart = new Cart(req.session.cart);
    res.render('cart', {
        title: 'NodeJS Shopping Cart',
        products: cart.getItems(),
        totalPrice: cart.totalPrice
    });
})

router.get('/remove/:id', (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
})

router.get('/custumer', (req, res) => {
    res.render('custumer')
})

router.post('/custumer', (req, res) => {
    let cart = new Cart(req.session.cart);
    let products = cart.getItems()
    const constDate = new Date()
    let date = constDate.toDateString()
    let order = new Order({
        Name: req.body.name,
        Item: products,
        Phone: req.body.phone,
        Email: req.body.email,
        Total: Number(cart.totalPrice),
        Date: date
    }) 

    order.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success");
            res.redirect('/')
        }
    })
})

module.exports = router;