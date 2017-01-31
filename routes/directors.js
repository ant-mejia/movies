var express = require('express');
var router = express.Router();

/* GET directors listing. */
router.get('/', function(req, res, next) {
  models.Directors.findAll({}).then(function(directors) {
    res.render('directors/index', {
      title: 'directors',
      name: name
    });
  });
});
router.get('/new', function(req, res, next) {
  res.render('directors/new');
});

router.post('/', function(req, res, next) {
  models.Directors.create({
      name: req.body.name
  }).then(function() {
    res.redirect('/directors')
  });
});

router.get('/:id', function(req, res, next) {
  models.Directors.findById(req.params.id).then(function(directors) {
    res.render('directors/show', { name: name });
  });
});

router.get('/:id/edit', function(req, res, next) {
  models.Directors.findById(req.params.id).then(function(directors) {
    res.render('directors/edit', { name: name });
  });
});

router.put('/:id', function(req, res, next) {
  models.Directors.update({
    name: req.body.name
  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/directors/' + req.params.id);
  });
});

router.delete('/:id', function(req, res, next) {
  models.Directors.destroy({
    where: { id: req.params.id }
  }).then(function(directors) {
    res.redirect('/directors');
  });
});

module.exports = router;
