var express = require('express');
var router = express.Router();
var models = require('../db/models/index');



router.get('/', function(req, res, next) {
  models.Movie.findAll({}).then(function(data) {
    res.render('movies/index', {
      title: 'Movies',
      movies:data
    });
  });
});



module.exports = router;
