var express = require('express');
var router = express.Router();

var UserController = require('../controllers/users');
var PictureController = require('../controllers/pictures');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/imgur', function(req, res, next) {
//   res.redirect(UserController.findUser)
// });

// FIND user info ONLY
router.get('/user/:fbID/', UserController.findUser);


router.get('/imgur', PictureController.imgur);

// POST user info.. FIND or CREATE user (happens AFTER FB OAUTH)
// router.post('/user/', UserController.findOrCreateUser);
router.post('/user/', UserController.findOrCreateUser, UserController.createUser);

// GET NEW matches of user. ie: CREATE matches
router.get('/user/:fbID/newmatches', UserController.findNewMatches, UserController.createNewMatches);

// GET existing matches of user AND UPDATE the matches
router.get('/user/:fbID/matches', UserController.findExistingMatches);


// POST/ CREATE picture relationship to user. currently NO way to update rel.
router.post('/picture/relationship', PictureController.createPictureRel);

// POST picture info.. CREATE PICTURE
router.post('/picture/', PictureController.createPictureNode);

// GET a single picture a user hasn't seen
router.get('/picture/:fbID/unseen', PictureController.findUnseenPictures, PictureController.findSeenPictures, PictureController.imgur);

// GET a count of all pictures a user has seen
router.get('/picture/:fbID/seen', PictureController.findSeenPictures);


// GET ALL nodes of a given :node type
router.get('/find/:node', UserController.findNodes);


// DEPRECATED POST user info.. create
// router.post('/user/:id/', UserController.createUser);

// //HTML API Documentation
// router.get('/api/docs', Controller.docsHTML);

// //JSON API Documentation
// router.get('/api/docs.json', Controller.docsJSON);


module.exports = router;
