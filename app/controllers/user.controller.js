const shop = require('../models/shop.js');
var mongoose = require('mongoose');


// Save FormData - User to MongoDB
exports.save = (req, res) => {
    var Shop = mongoose.model('Shop', shop.shoppingSchema, 'shops');
    const shops = new Shop(req);
    shops.save()
        .then(data => {
            console.log(data)
            res.send(data);
        }).catch(err => {
            console.log(err)
            res.status(500).send({
                message: err.message
            });
        });
};

// Fetch all Users
exports.findAll = (res) => {
    var res = res;
    shop.find({}, function (err, items) {
        if (err) {
            res.json(err);
        } else {
            res.json({ results: items });
            // res.end("all")
        }
    });

};

exports.delete = (id, res) => {
    shop.findByIdAndRemove(id, (err, doc) => {
        if (err) {
            res.end(""+doc)
        } else {
            res.end(""+doc)
            console.log('deleted')
        }
    });   
}

exports.update = (id,newData, res) => {
    shop.findByIdAndUpdate(id, newData,(err, doc) => {
        if (err) {
            res.end("0")
        } else {
            res.json(doc)
            console.log(doc)
        }
    });
}

exports.findId = (res, id) => {
    shop.findById(id, (err, doc) => {
        console.log(doc)
        if (err) {
            res.end(doc);
        } else {
            res.json({ results: doc });
        }
    });
}
