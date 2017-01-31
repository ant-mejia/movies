var express = require('express');
var router = express.Router();
var models = require('../db/models/index');

/* GET directors listing. */
router.get('/', function(req, res, next) {
  models.Director.findAll({}).then(function(directors) {
    res.render('directors/index', {
      title: 'Directors',
      directors: directors
    });
  });
});


router.get('/new', function(req, res, next) {
  res.render('directors/new');
});

router.post('/', function(req, res, next) {
  models.Director.create({
      name: req.body.name
  }).then(function() {
    res.redirect('/directors')
  });
});

router.get('/:id', function(req, res, next) {
  models.Director.findById(req.params.id).then(function(director) {
    res.render('directors/show', { director: director });
  });
});

router.get('/:id/edit', function(req, res, next) {
  models.Director.findById(req.params.id).then(function(director) {
    res.render('directors/edit', { director: director });
  });
});

router.put('/:id', function(req, res, next) {
  models.Director.update({
    name: req.body.name
  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/directors/' + req.params.id);
  });
});

router.delete('/:id', function(req, res, next) {
  models.Director.destroy({
    where: { id: req.params.id }
  }).then(function(directors) {
    res.redirect('/directors');
  });
});

module.exports = router;
