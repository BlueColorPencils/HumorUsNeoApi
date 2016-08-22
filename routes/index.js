var express = require('express');
var router = express.Router();

var UserController = require('../controllers/users');
var PictureController = require('../controllers/pictures');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// FIND user info ONLY
router.get('/user/:fbID/', UserController.findUser);

// POST user info.. FIND or CREATE user (happens AFTER FB OAUTH)
router.post('/user/', UserController.findOrCreateUser);

// GET a single picture a user hasn't seen
router.get('/user/:fbID/pictures', PictureController.findUnseenPictures);

// POST picture info.. CREATE PICTURE
router.post('/picture/', PictureController.createPictureNode);

// POST/ CREATE picture relationship to user. currently NO way to update rel.
router.post('/picture/relationship', PictureController.createPictureRel);

// GET a count of all pictures a user has seen
// router.get('/user/:id/picturecount', PictureController.unseenByPerson);

// GET NEW matches of user. ie: CREATE matches
router.get('/user/:fbID/newmatches', UserController.findNewMatches);

// GET existing matches of user AND UPDATE the matches
router.get('/user/:fbID/matches', UserController.findExistingMatches);

// GET ALL nodes of a given :node type
router.get('/find/:node', UserController.findNodes);


// // UPDATE matches (percentages) of user
// router.post('/user/:id/updatematches', PictureController.findMatchesByUser);


// DEPRECATED POST user info.. create
// router.post('/user/:id/', UserController.createUser);


//

// // Given a sort column, return n customer records, offset by p records (this will be used to create "pages" of users)
// // Sort columns are: name, registered_at, postal_code
// // router.get('/users/sort/:query', UserController.subset);
// router.get('/users/sort/:query', UserController.subset);
//
// // Given a customer's id...
// // List the pictures they currently have checked out
// router.get('/users/:id/current', UserController.current)
//
//
// // Given a customer's id...
// // List the pictures a customer has checked out in the past (ordered by check out date, includes return date)
// router.get('/users/:id/history', UserController.history)
//
//
// // Retrieve a list of all pictures
// router.get('/pictures', PictureController.index);
//
// // Retrieve a subset of picture
// // Given a sort column, return n picture records, offset by p records (this will be used to create "pages" of pictures)
// // Sort columns are: title, release_date
//  router.get('/pictures/sort/:query', PictureController.find)
//  // router.get('/pictures/sort/:query?n=1&p=5', PictureController.subset)
//  // query of title or release_date
//
//
//  // Given a picture's title...
//  // Get a list of users that have currently checked out a copy of the film
//  // include each customer's name, phone number, and account credit
//  router.get('/pictures/:picture/current', PictureController.current)
//
// //
// // Given a picture's title...
// // Get a list of users that have checked out a copy in the past
// // include each customer's name, phone number, and account credit
// // ordered by customer name or ordered by check out date
// router.get('/pictures/:picture/history/sort/:query', PictureController.history)
//
// // See a list of users with overdue pictures (/rentals/overdue)
// // include customer name, picture title, check-out date, and return date
// router.get('/rentals/overdue', RentalController.overdue);
//
// // Look a picture up by title to see (/rentals/Jaws)
// // it's synopsis
// // release date
// // available inventory (not currently checked-out to a customer)
// // and inventory total
// router.get('/rentals/:picture', RentalController.find);
//
// // See a list of users that have currently checked out any of the picture's inventory (/rentals/Jaws/users)
// router.get('/rentals/:picture/users/', RentalController.findUseromers);
//
// // Given a customer's id and a picture's title ...
// // "check out" one of the picture's inventory to the customer (/rentals/Jaws/check-out)
// // Establish a return date
// // Charge the customer's account (cost up to you)
// router.get('/rentals/:picture/check-out/:id', RentalController.checkOut);
//
//
// // "check in" one of customer's rentals (/rentals/Jaws/return)
// // return the picture to its inventory
// router.get('/rentals/:picture/return/:id', RentalController.return);
//
// //HTML API Documentation
// router.get('/api/docs', Controller.docsHTML);
//
//
// //JSON API Documentation
// router.get('/api/docs.json', Controller.docsJSON);


module.exports = router;
