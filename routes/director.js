const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Directors
const Director = require('../models/Director');

router.get('/', (req, res, next) => { // tum directorleri getirir
  const promise = Director.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true // herhangi bir data ile eslesmesede tum directorleri listeler
      }
    },
    {
      $group: { // ayni directorun birden fazla filmi varsa onu gruplar
        _id: {  // bir director birden fazla film yonettiyse directorleri _id bilgileriyle gruplar
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: { // direktorun filmlerini buradaki listeye push et
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
      } 
    }
  ]);
  
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/:director_id', (req, res, next) => { // sadece belirtilen id deki directoru getirir
  const promise = Director.aggregate([
    {
      $match: {
        '_id' : mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true // herhangi bir data ile eslesmesede tum directorleri listeler
      }
    },
    {
      $group: { // ayni directorun birden fazla filmi varsa onu gruplar
        _id: {  // bir director birden fazla film yonettiyse directorleri _id bilgileriyle gruplar
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: { // direktorun filmlerini buradaki listeye push et
          $push: '$movies'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
      } 
    }
  ]);
  
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