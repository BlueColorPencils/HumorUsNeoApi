var express = require('express');
var router = express.Router();

var UserController = require('../controllers/users');
var PictureController = require('../controllers/pictures');
//
// CREATE(a:Picture
// {

// {
//     "imgurID": "GaCKufm",
//     "title": "There's two types of kids on the first day of school..",
//     "name": 1,
//     "description": null,
//     "link": "http://i.imgur.com/GaCKufm.jpg",
//     "dateAdded": "1471827053360",
//     "type": "image/jpeg"
//   }
//
// {
//     "imgurID": "OJ0q3SF",
//     "title": "I don't live in a great a neighborhood. Thanks, USPS.",
//     "name": 2,
//     "description": null,
//     "link": "http://i.imgur.com/OJ0q3SF.jpg",
//     "dateAdded": "1471827053360",
//     "type": "image/jpeg"
//
//   }
//
// {
//     "imgurID": "kZ3eWo2",
//     "title": "Getcha Dad joke here",
//     "name": 3,
//     "description": null,
//     "link": "http://i.imgur.com/kZ3eWo2.png",
//     "dateAdded": "1471827053360",
//     "type": "image/jpeg"
//
// }
//
// {
//     "imgurID": "H9hLWtA",
//     "title": "the end of racism!",
//     "name": 4,
//     "description": null,
//     "link": "http://i.imgur.com/H9hLWtA.jpg",
//     "dateAdded": "1471827053360",
//     "type": "image/jpeg"
//
//   }
//
// {
//     "imgurID": "tgoJI3X",
//     "title": "There's two types of horses in the stable",
//     "name": 5,
//     "description": null,
//     "link": "http://i.imgur.com/tgoJI3X.jpg",
//     "dateAdded": "1471827053360",
//     "type": "image/jpeg"
//
//   }
//
// {
//     "imgurID": "EjhkDjO",
//     "title": "They caught me, guys...",
//     "name": 6,
//     "description": null,
//     "link": "http://i.imgur.com/EjhkDjO.jpg",
//     "dateAdded": "1471827053360",
//     "type": "image/jpeg"
//
//   }
//
// {
//     "imgurID": "gX00ou9",
//     "title": "My mom was overjoyed to learn about Pokémon Go from my nephew",
//     "name": 7,
//     "description": null,
//     "link": "http://i.imgur.com/gX00ou9.jpg",
//     "dateAdded": "1471827053360",
//     "type": "image/jpeg"
//
//   }
//
// {
//     "imgurID": "lA2M0",
//     "title": "Need a loan?",
//     "name": 8,
//     "description": null,
//     "link": "http://i.imgur.com/lA2M0.jpg",
//     "dateAdded": "1471827053360",
//     "type": "image/jpeg"
//
//   }
//
// {
//     "imgurID": "hfq1kmi",
//     "title": "I'm not saying they won't do this",
//     "name": 9,
//     "description": null,
//     "link": "http://i.imgur.com/hfq1kmi.png",
//     "dateAdded": "1471827053360",
//     "type": "image/jpeg"
//
//   }
//   {
//     "imgurID":"WpuK6yr",
//     "title": "Roommate found the greatest thing for his bunny at work yesterday",
//     "name": 10,
//     "description": null,
//     "link": "http://i.imgur.com/WpuK6yr.jpg",
//     "dateAdded": "1471827053360",
//     "type": "image/jpeg"
//
//   }
// }

//
// CREATE (a:User
// {
//   "fbID": "11111111",
//   "name": "Cristal Tay",
//   "birthday": null,
//   "age": 21,
//   "photo": "https://scontent.xx.fbcdn.net/v/t1.0-1/c0.0.50.50/p50x50/13010630_10206859226907492_8864963793655632175_n.jpg?oh=a60ff3a2b787e8a791901d051147f2c0&oe=5857BD34",
//   "gender": "female",
//   "preferredGender": null,
//   "preferredLocationKM": null,
//   "preferredAgeMin": null,
//   "preferredAgeMax": null,
//   "lat": 47.6062100,
//   "long": -122.3320710,
//   "dateJoined": null,
//   "dateLastLogin": null,
//   "description": "hi I am cristal"
// }
// )
// {
//   "fbID": "22222222",
//   "name": "Ann Banan",
//   "birthday": null,
//   "age": 22,
//   "photo": "http://i.imgur.com/SSADow0.jpg",
//   "gender": "female",
//   "preferredGender": null,
//   "preferredLocationKM": null,
//   "preferredAgeMin": null,
//   "preferredAgeMax": null,
//   "lat": 47.6062100,
//   "long": -122.3320710,
//   "dateJoined": null,
//   "dateLastLogin": null,
//   "description": null
// }
// )
//
// CREATE (c:User
// {
//   "fbID": "33333333",
//   "name": "Dan Dude",
//   "birthday": null,
//   "age": 24,
//   "photo": "http://i.imgur.com/vykoKV9.jpg",
//   "gender": "male",
//   "preferredGender": null,
//   "preferredLocationKM": null,
//   "preferredAgeMin": null,
//   "preferredAgeMax": null,
//   "lat": 47.6062100,
//   "long": -122.3320710,
//   "dateJoined": null,
//   "dateLastLogin": null,
//   "description": null
// }
// )
//
// CREATE (d:User
// {
//   "fbID": "44444444",
//   "name": "Michael Cera",
//   "birthday": null,
//   "age": 33,
//   "photo": "http://i.imgur.com/BhecDWJ.jpg",
//   "gender": "male",
//   "preferredGender": null,
//   "preferredLocationKM": null,
//   "preferredAgeMin": null,
//   "preferredAgeMax": null,
//   "lat": 47.6062100,
//   "long": -122.3320710,
//   "dateJoined": null,
//   "dateLastLogin": null,
//   "description": null
// }
// )
//
// CREATE (e:User
// {
//   "fbID": "55555555",
//   "name": "Rando L Hm",
//   "birthday": null,
//   "age": 30,
//   "photo": "http://i.imgur.com/vttCbSb.png",
//   "gender": "male",
//   "preferredGender": null,
//   "preferredLocationKM": null,
//   "preferredAgeMin": null,
//   "preferredAgeMax": null,
//   "lat": null,
//   "long": null,
//   "dateJoined": null,
//   "dateLastLogin": null,
//   "description": null
// }
// )


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET ALL nodes of a given :node type
router.get('/find/:node', UserController.findNodes);

// POST user info.. FIND or CREATE user
router.post('/user/', UserController.findOrCreateUser);
// router.post('/user/:id/', UserController.findUser);


// DEPRECATED POST user info.. create
// router.post('/user/:id/', UserController.createUser);

// GET a single picture a user hasn't seen
router.get('/user/:fbID/pictures', PictureController.findUnseenPictures);

// POST picture info.. CREATE PICTURE
router.post('/picture/', PictureController.createPictureNode);

// GET a count of all pictures a user has seen
// router.get('/user/:id/picturecount', PictureController.unseenByPerson);

// // POST picture relationship. create. there's NO way to update a pic rel.
// router.post('/user/:id/picture/:picid', UserController.createUser);


// GET NEW matches of user. ie: CREATE matches
router.get('/user/:fbID/newmatches', UserController.findNewMatches);

// GET existing matches of user AND UPDATE the matches
router.get('/user/:id/matches', UserController.findExistingMatches);

// // UPDATE matches (percentages) of user
// router.post('/user/:id/updatematches', PictureController.findMatchesByUser);


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
