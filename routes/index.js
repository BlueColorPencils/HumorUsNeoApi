var express = require('express');
var router = express.Router();

var UserController = require('../controllers/users');
var PictureController = require('../controllers/pictures');


// CREATE (a:User {fbID: '10207632258632802', name: 'Cristal Tay', birthday: null, age: 21, photo: 'https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.50.50/p50x50/13010630_10206859226907492_8864963793655632175_n.jpg?oh=a60ff3a2b787e8a791901d051147f2c0&oe=5857BD34', gender: "female", preferredGender: "male", preferredLocationKM: 25, preferredAgeMin: 20, preferredAgeMax: 45, lat: 47.6062100, long: -122.3320710, dateJoined: 'Fri Aug 19 2016 14:18:15 GMT-0700 (PDT)', dateLastLogin: 'Fri Aug 19 2016 14:22:15 GMT-0700 (PDT)', description: 'hi I'm cristal })
//
// CREATE (b:User {fbID: '10207632258632803', name: 'Ann Dash', birthday: null, age: 22, photo: 'http://i.imgur.com/SSADow0.jpg', gender: "female", preferredGender: "male", preferredLocationKM: 20, preferredAgeMin: 25, preferredAgeMax: 30, lat: 47.6062100, long: -122.3320710, dateJoined: 'Fri Aug 19 2016 14:18:15 GMT-0700 (PDT)', dateLastLogin: 'Fri Aug 19 2016 14:22:15 GMT-0700 (PDT)', description: 'anny banany })
//
// CREATE (c:User {fbID: '10207632258632804', name: 'Dan Dude', birthday: null, age: 24, photo: 'http://i.imgur.com/vykoKV9.jpg', gender: "male", preferredGender: "female", preferredLocationKM: 10, preferredAgeMin: 21, preferredAgeMax: 26, lat: 47.6062100, long: -122.3320710, dateJoined: 'Fri Aug 19 2016 14:18:15 GMT-0700 (PDT)', dateLastLogin: 'Fri Aug 19 2016 14:22:15 GMT-0700 (PDT)', description: "this is dan dude"})
//
// CREATE (d:User {fbID: '10207632258632805', name: 'Michael Cera', birthday: null, age: 33, photo: 'http://i.imgur.com/BhecDWJ.jpg', gender: "male", preferredGender: "female", preferredLocationKM: 10, preferredAgeMin: 21, preferredAgeMax: 26, lat: 47.6062100, long: -122.3320710, dateJoined: 'Fri Aug 19 2016 14:18:15 GMT-0700 (PDT)', dateLastLogin: 'Fri Aug 19 2016 14:22:15 GMT-0700 (PDT)', description: "juno"})
//
// CREATE (e:User {fbID: '10207632258632806', name: 'Rando L Hm', birthday: null, age: 30, photo: 'http://i.imgur.com/vttCbSb.png',
// gender: "male", preferredGender: "female", preferredLocationKM: 10, preferredAgeMin: 21, preferredAgeMax: 26, lat: 47.6062100, long: -122.3320710, dateJoined: 'Fri Aug 19 2016 14:18:15 GMT-0700 (PDT)', dateLastLogin: 'Fri Aug 19 2016 14:22:15 GMT-0700 (PDT)', description: 'meow meow meow'})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET user info.. do they exist? id would be fb id since its unique
router.get('/find/:node', UserController.findNodes);

// GET user info.. do they exist? id would be fb id since its unique
router.get('/user/:id/', UserController.findUser);

// POST user info.. create DEPRECATED
// router.post('/user/:id/', UserController.createUser);

// GET a single picture a user hasn't seen
router.get('/user/:id/picture', PictureController.unseenByPerson);
//

// GET a count of all pictures a user has seen
router.get('/user/:id/picturecount', PictureController.unseenByPerson);

// // POST picture relationship. create. there's NO way to update a pic rel.
// router.post('/user/:id/picture/:picid', UserController.createUser);


// // POST matches of user. CREATE matches
// router.post('/user/:id/creatematches', PictureController.findMatchesByUser);

// // UPDATE matches (percentages) of user
// router.post('/user/:id/updatematches', PictureController.findMatchesByUser);

// // GET existing matches of user
// router.post('/user/:id/matches', PictureController.findMatchesByUser);

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
