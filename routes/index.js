var express = require('express');
var router = express.Router();

var UserController = require('../controllers/users');
var PictureController = require('../controllers/pictures');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res, next) {
 res.json({"HI": "THERE"})
 })

// **BUTTON** - (profile) FIND user info ONLY
router.get('/user/:fbID/', UserController.findUser);

router.get('/imgur/:album/:topic/:top/:time/:page', PictureController.imgurs);

// AFTER FB OAUTH - POST user info.. FIND or CREATE user
// router.post('/user/', UserController.findOrCreateUser);
router.post('/user/', UserController.findOrCreateUser, UserController.createUser);

// Update location...
router.post('/user/updateloc', UserController.updateLocation);


// Update a user's info
router.post('/user/update', UserController.updateUser);

// **BUTTON** (pictures) GET a single picture a user hasn't seen
router.get('/user/:fbID/unseen', PictureController.findUnseenPictures, PictureController.imgur);

// AFTER PICTURE SWIPE - (1 of 2) FIND seen pictures -> Triggers FIND new matches when picture count%50 is 0 -> GET NEW matches of user.CREATE matches RETURNS an integer of new matches
router.get('/user/:fbID/newmatches', PictureController.findSeenPicturesCount,  UserController.findNewMatches, UserController.createNewMatches);

//setPictureLike
// AFTER PICTURE SWIPE - (2 of 2) CREATE picture relationship -> FIND new picture to see -> calls Imgur after.
router.post('/picture/newpictures', PictureController.createPictureRel);

// AFTER PICTURE SWIPE - (3 of 3) FIND unseen pictures -> If NONE, add new pictures .
// router.get('/user/:fbID/backend',  PictureController.findUnseenPictures, PictureController.imgur);

// **BUTTON** (matches) GET existing matches of user AND UPDATE the matches
router.get('/user/:fbID/matches', UserController.findExistingMatches);

// POST CREATE picture relationship to user. currently NO way to update rel.
// router.post('/picture/relationship', PictureController.createPictureRel);

// POST picture info.. CREATE PICTURE
// router.post('/picture/', PictureController.createPictureNode);


// router.get('/user/:fbID/unseen', PictureController.findUnseenPictures, PictureController.imgur);

// GET a single picture a user hasn't seen
// router.get('/picture/:fbID/unseen', PictureController.findUnseenPictures, PictureController.findSeenPicturesCount, PictureController.imgur);

// GET a count of all pictures a user has seen
// router.get('/picture/:fbID/unseeen', PictureController.findUnseenPictures);

// GET ALL nodes of a given :node type
router.get('/find/:node', UserController.findNodes);


// DEPRECATED POST user info.. create
// router.post('/user/:id/', UserController.createUser);

// //HTML API Documentation
// router.get('/api/docs', Controller.docsHTML);

// //JSON API Documentation
// router.get('/api/docs.json', Controller.docsJSON);


module.exports = router;
