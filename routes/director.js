var express = require('express');
var router = express.Router();

// Directors
const Director = require('../models/Director');

router.get('/', (req, res, next) => {
  const promise = Director.find({});
  
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.post('/', (req,res,next) => {
  const director = new Director(req.body);

  const promise = director.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
