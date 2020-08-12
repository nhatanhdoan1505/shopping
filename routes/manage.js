const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const {
    ensureAuthenticated,
    forwardAuthenticated
} = require('../config/auth');
const {
    authenticate
} = require('passport');
const Categories = require("../model/product");
const Order = require('../model/order')
const {
    route
} = require('.');
// Set storage engine
const storage = multer.diskStorage({
    destination: 'public/assets/img',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }

})
// Init upload
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('img')
// Check file input
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Home Page

router.get('/', ensureAuthenticated, (req, res) => {
    Categories.find({}, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            Order.find({}, (err, order) => {
                if(err){
                    console.log(err)
                }else {
                    res.render('admin', {
                        category: cate,
                        order: order,
                    })
                }
            }) 
        }
    })
})


// About Page
router.get('/tcdb', (req, res) => {
    Categories.find({
        Type: 'tcdb'
    }, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            Order.find({}, (err, order) => {
                if(err){
                    console.log(err)
                }else {
                    res.render('admin', {
                        category: cate,
                        order: order,
                    })
                }
            })
        }
    })
})

// Contact Page
router.get('/ccdb', (req, res) => {
    Categories.find({
        Type: 'ccdb'
    }, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            Order.find({}, (err, order) => {
                if(err){
                    console.log(err)
                }else {
                    res.render('admin', {
                        category: cate,
                        order: order,
                    })
                }
            })
        }
    })
})

// Category Page
router.get('/ccmn', (req, res) => {
    Categories.find({
        Type: 'ccmn'
    }, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            Order.find({}, (err, order) => {
                if(err){
                    console.log(err)
                }else {
                    res.render('admin', {
                        category: cate,
                        order: order,
                    })
                }
            })
        }
    })
})

// Category Page
router.get('/pktt', (req, res) => {
    Categories.find({
        Type: 'pktt'
    }, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            Order.find({}, (err, order) => {
                if(err){
                    console.log(err)
                }else {
                    res.render('admin', {
                        category: cate,
                        order: order,
                    })
                }
            })
        }
    })
})

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            Categories.find({}, (error, cate) => {
                if (error) {
                    console.log(error);
                } else {
                    Order.find({}, (err, order) => {
                        if(err){
                            console.log(err)
                        }else {
                            res.render('admin', {
                                msg: err,
                                category: cate,
                                order: order
                            })
                        }
                    })
                }
            })
        } else {
            if (req.file == undefined) {
                Categories.find({}, (error, cate) => {
                    if (error) {
                        console.log(error);
                    } else {
                        Order.find({}, (err, order) => {
                            if(err){
                                console.log(err)
                            }else {
                                res.render('admin', {
                                    msg: "Error: No File Selected!",
                                    category: cate,
                                    order: order
                                })
                            }
                        })
                    }
                })
            } else {
                const cate = new Categories({
                    Name: req.body.name,
                    Id: req.body.id,
                    Prize: Number(req.body.prize),
                    Img: req.file.filename,
                    Type: req.body.type
                })

                cate.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Success");
                        Categories.find({}, (err, cate) => {
                            if (err) {
                                console.log(err);
                            } else {
                                Order.find({}, (err, order) => {
                                    if(err){
                                        console.log(err)
                                    }else {
                                        res.render('admin', {
                                            category: cate,
                                            order: order
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
    })
})

router.get('/delete/:id', (req, res) => {
    let productId = req.params.id
    Categories.deleteOne({Id : productId}, (err) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/')
        }
    })
})

module.exports = router;