var express = require('express');
var router = express.Router();
var models = require('../db/models/index');


//loads page
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
//  Code reads top down, so new has to be above /id or
// it reads id/new understand?
///////////////////////////////////////////////////////////

//displays a new form to enter in the database
 router.get('/new', function(req, res, next) {
     res.render('movies/new', {
       title: 'new movie'
     });
   });

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

//get the movies by id
router.get('/:id', function(req, res, next) {
models.Movie.findById(req.params.id).then(function(data) {
  res.render('movies/show', {
    movie:data
  });
});
});

//editing pages
//edit the show page (router for edit page)
router.get('/:id/edit', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(data) {
    res.render('movies/edit', {
       movie: data
     });
  });
});


//edit allow the edit to work and redirects user to info page
router.put('/:id', function(req, res, next) {
   models.Movie.update({
     title: req.body.title,
     synopsis: req.body.synopsis
   }, { where: { id: req.params.id } }).then(function() {
     res.redirect('/movies/' + req.params.id);
   });
 });


///////////////////////////////////////////////////////////
//currently not working
///////////////////////////////////////////////////////////




//posts to database
   router.post('/', function(req, res, next) {
    models.Movie.create({
      title: req.body.title,
      synopsis: req.body.synopsis
    }).then(function(){
      res.redirect('/movies/')
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
