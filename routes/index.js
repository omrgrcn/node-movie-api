const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  const { username, password } = req.body;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      console.log('pass uzunlugu :', hash.length);
      const user = new User({
        username,
        password: hash
      });
      const promise = user.save();
      promise.then((data) => {
        res.json(data);
      }).catch((err) => {
        res.json(err);
      });
    });
  });
});

module.exports = router;
