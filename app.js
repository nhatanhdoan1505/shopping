const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
let Categories = require("./model/category")
let Admin = require('./model/admin')
const {
    escapeXML
} = require('ejs')
require('./mongooes/mongooes')


const app = express()

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/assets/img',
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


app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('./public'))
app.use(bodyParser.urlencoded({
    extended: true
}))


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/categories', (req, res) => {
    let page = Number(req.param.page) || 1
    let perPage = 3

    let start = (page - 1) * perPage
    let end = page * perPage

    Categories.find({}, (err, cate) => {
        if (err) {
            console.log(err);
        } else {
            res.render('categories', {
                category: cate
            })
        }
    })
})

app.get('/admin', (req, res) => {
    res.render('login')
})

app.post('/manage', (req, res) => {
    let admin = req.body.email
    let password = req.body.password


    Admin.findOne({
        Name: admin
    }, (err, result) => {
        if (err) {
            console.log("Error: " + err)
        } else {
            if (result == undefined) {
                res.render(login)
            } else {
                if (result.Password != password) {
                    res.render('login')
                } else {
                    Categories.find({}, (err, cate) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('admin', {
                                category: cate
                            })
                        }
                    })
                }
            }
        }
    })
})

app.post('/product', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            Categories.find({}, (error, cate) => {
                if (error) {
                    console.log(error);
                } else {
                    res.render('admin', {
                        msg: err,
                        category: cate
                    })
                }
            })
        } else {
            if (req.file == undefined) {
                Categories.find({}, (error, cate) => {
                    if (error) {
                        console.log(error);
                    } else {
                        res.render('admin', {
                            msg: "Error: No File Selected!",
                            category: cate
                        })
                    }
                })
            } else {
                const cate = new Categories({
                    Name: req.body.name,
                    Prize: Number(req.body.prize),
                    Img: req.file.filename,
                    Type: req.body.type
                })

                cate.save((err) => {
                    if (err) {
                        console.log('Loi');
                    } else {
                        console.log("Success");
                        Categories.find({}, (err, cate) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.render('admin', {
                                    category: cate
                                })
                            }
                        })
                    }
                })
            }
        }
    })
})

app.listen(3000, () => {
    console.log('Server start');
})