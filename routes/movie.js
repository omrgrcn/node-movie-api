const express = require('express');
const router = express.Router();

// Models
const Movie = require('../models/Movie');

router.post('/', (req, res, next) => {
  const movie = new Movie(req.body);

/*
   const { title, imdb_score, category, country, year } = req.body;
  
  const movie = new Movie({
    title: title,
    imdb_score: imdb_score,
    category: category,
    country: country,
    year: year
  });
*/

/*
   movie.save((err, data) => {
    if (err)
      res.send(err);

    res.send(data);   
  });
*/

  const promise = movie.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });

});

module.exports = router;
