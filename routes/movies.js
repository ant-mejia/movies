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

//posts movies
router.post('/movies', function(req, res, next) {
  models.Movie.create({
  id: req.body.id,
  title: req.body.title,
  synopsis: req.body.synopsis
  }).then(function(){
    res.redirect('/movies/index')
  })
});

///////////////////////////////////////////////////////////
//currently not working
///////////////////////////////////////////////////////////

//supposed to post movies
router.post('/movies', function(req, res, next) {
  models.Movie.create({
  id: req.body.id,
  title: req.body.title,
  synopsis: req.body.synopsis
  }).then(function(){
    res.redirect('/movies/index')
  })
});


//get the movies by id
router.get('/:id', function(req, res, next) {
models.Movie.findById(req.params.id).then(function(id) {
  res.render('movies/show', {
    title: 'Movies',
    movies:data
  });
});
});

//edit the pages

//edit the show page
router.get('/:id/edit', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(user) {
    res.render('movies/edit', {
       movies: data
     });
  });
});

//edit the page?
router.put('/:id', function(req, res, next) {
   models.Movie.update({
     id: req.body.id,
     title: req.body.title,
     synopsis: req.body.synopsis
   }, { where: { id: req.params.id } }).then(function() {
     res.redirect('/movies/index/' + req.params.id);
   });
 });

//displays a new form to enter in the database
 router.get('/movies/new', function(req, res, next) {
     res.render('movies/new', {
       title: 'hey now'
     });
   });

//posts to database
   router.post('/', function(req, res, next) {
    models.Movie.create({
      id: req.body.id,
      title: req.body.title,
      synopsis: req.body.synopsis
    }).then(function(){
      res.redirect('/movies/index')
    })
  });

  // deletes
  router.delete('/:id', function(req, res, next) {
  models.Movie.destroy({
    where:{ id: req.params.id }
  }).then(function(user){
    res.redirect('/movies/index');
  });
});
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

module.exports = router;
